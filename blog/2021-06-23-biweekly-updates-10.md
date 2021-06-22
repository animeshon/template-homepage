---
cat: update
path: '/blog/biweekly-updates-10/'
slug: 'biweekly-updates-10'
publishedAt: '2021-06-23'
author: Matteo Roggia
target: all
title: 'Bi-Weekly Updates #10'
teaser: |
  Authentication and Authorization ready for production, let's talk about the CrossRefs Manager and the reason behind the commitment on this service
overline: >
  Bi-Weekly Updates
---

Konnichiwa, Matteo desu.

Here we go again with another Bi-Weekly Update.
Incredibly, this sprint we have developed and worked following what we wrote in the [Release Roadmap](/blog/release-roadmap-media-platform-2021/), moving forward towards our fist release: **Release 1: User registration with minimal features**.

Specifically, we have been working on the **CrossRefs Manager**, on gRBAC and a new library which allows our services to synchronously write data in our Graph Databases (mentioned in the [Release Roadmap](/blog/release-roadmap-media-platform-2021/) under the *Asynchronous to Synchronous* section),

I'll also spend some more words on the **CrossRefs Manager** since this is the third update in a row we are telling you we worked on this specific service.

But first things first, let's go with the bullet list:

- Conversion of the CrossRefs Manager into a standalone service
- Refactor of the CrossRefs Manager to allow gRPC communication
- Refactor of the CrossReference management flow and GUI (still on WIP)
- Full Implementation of gRBAC which flags the Authentication and Authorization infrastructure to be ready for release
- Development of a library to write our Data-Graph directly in our Graph-Databases (instead of using an asynchronous flow)


------------

Following this TL;DR version of the update, I will take some time to talk about the **CrossRefs Manager**, since it is fair to give some context and motivation for the massive commitment we are putting on this single service.

To explain the importance of this little but essential component of our Ecosystem, I have to start by introducing the concept of  **CrossReference** first.

### CrossReference

When we started working on *Detabesu*, we thought that grouping different representations of the same entity across multiple external data sources was a good feature both for Projects integrating *Animeshon* and for Animeshon itself.
A big Data-Graph consolidating information in a way no one did before (for us), and traversable edges to external sources (for Third-Party projects).

At the time *Wormhole* was just a pipeline to preseed data into *Detabesu*, and the **CrossReferences** were just a convenient way to tell the system to "put this data together with this one".

Therefore the **CrossRefs Manager** was a helper in charge of generating **CrossReferences** and letting operators manage them. The entire concept of the **CrossReferences** was internal to *Wormhole*, used only by *Wormhole* and living inside *Wormhole's Database*.

The situation changed when we plugged a new piece in the Ecosystem: **Isekai**, the service responsible for **User Contributions**.
After numerous week of design and experiments, we came to the conclusion that the only way to allow **User Contributions** in *Detabesu* in such a way that we could replicate the contributions regardless of the external data, regardless of the data structure, without encountering a situation where *Wormhole* would have overwritten a **User Contributions**, was to make *Isekai* another provider of *Wormhole* itself.

By doing this, any **Contribution** submitted to *Isekai* gets piped in *Wormhole* and gets consolidated again using the same process we are using now for external sources.

But of course, we need to tell the system that a particular **User Contributions** belongs to a specific entity, and it might change the output or correct some data of another external entity. Basically, the system has to attach the **User Contributions** to a **CrossReference**.

In the end the concept of **CrossReference** changed from `A nice feature which helps us to preseed the database and helps third-party projects link entities across multiple services` to `If something is not attached to a **CrossReference**, it doesn't exist in the Animeshon Ecosystem`.

### CrossRefs Manager

By making **CrossReferences** the most important concept of the entire Ecosystem, we had to ensure that the service managing them was not just a helper which takes data from the database, does some stuff, and then puts everything back in the same database.

![CrossRefs Manager diagram](/blog/2021-06-23-biweekly-updates-10/crossrefs-manager-diagram.svg)

The image shows how the **CrossRefs Manager** has become a critical service in the *Wormhole* pipeline since it manages the anchors needed by other services to consolidate the information and generate the final *Detabesu Data-Graph*.

In the last weeks, we rewrote almost the entire service to be easily usable from other services (e.g *Isekai* needs to check if the contribution it has to create is part of an already existing entity or it is a completely new entity in the system), more stable and trackable.

One of the biggest improvements we did was to store the concept of **CrossReferences** not in the same database as the entities it links but in dedicated key-value storage. There we can not only keep track of who did changes on which **CrossReference**, but we are also able to tell which **CrossReference** was generated by an algorithm (and therefore can be discarded and re-generated) and which are **verified** by an Operator or by a "super-service".

Once a **CrossReference** is created and the data is migrated in *Detabesu*, it becomes difficult to change the underlying structure without breaking changes and loss of SEO ranking or broken logic in third-party projects. Therefore we invested much more time than we expected in this service to make sure once it is in production we won't have to change its core logic.

Last but not least, we also wanted to make the **CrossRefs Manager** the first service integrated with our *Authentication*, giving access to people outside Animeshon which can test both systems and also help Animeshon to cross-reference more entities (since what we are exposing now is just a small part of the data we were able to link with an algorithm) generating a more complete and useful Data-Graph in *Detabesu*.

At this point you might wonder "who cares about *Detabesu*, do some work for the actual **Media Platform**". Spoiler alert, release of chapters in the **Media Platform** are just **User Contributions**. But this is something we will exaplain in another post :)

For the most curious, you can check the protobuf definitions in our [Open Source Repository](https://github.com/animeapis/animeapis/tree/master/animeshon/crossrefs/v1alpha1).

Ja ne～
