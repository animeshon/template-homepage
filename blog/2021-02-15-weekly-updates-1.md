---
path: '/blog/weekly-updates-1/'
slug: 'weekly-updates-1'
publishedAt: '2021-02-17'
author: Matteo Roggia
target: all

title: 'Weekly Updates #1 - v21.02 Release'
teaser: |
  To celebrate the v21.02 release we want to introduce to our community the new "weekly updates" initiative as well as illustrate our achievements and plans for the future.

overline: >
  Weekly Updates
---

Konnichiwa, Matteo desu.

Our beloved data fetishists, it has been a while since the release of the Animeshon Encyclopedia and Detabesu.

Today, to celebrate the imminent v21.02 release we want to present you our new initiative, the **weekly updates**, as well as illustrate the **progress** done so far and our plans for Animeshon.


# Weekly updates

The Team of Animeshon is putting a huge effort into this project, but the occasions to show our activity and enthusiasm are still very few.
We believe that short but regular updates about the project will help the community to stay up-to-date with the development of Animeshon as well as documenting our will of building something amazing. We are therefore planning to write and publish every week the progress of our mission. The updates might, of course, be very short or very long, depending on the goals and focus of each week. Nevertheless, we believe it will become an interesting appointment for both the community and the Animeshon staff.


# Detabesu and Encyclopedia

On the 20th of December, we released the first Beta Version of the Encyclopedia along with Detabesu. The Beta was primarily meant to be a showcase and testing field for Detabesu, rather than a functional product.
Thanks to the feedback received, we have been able to work with a better mindset on this iteration, leading to the improvement and fine-tuning of our infrastructure and components which will ultimately help us get closer to a stable and final product. A product we believe will bring huge value to the community.


## Iteration insights

During the last development iteration, many steps forward have been made. New features, fine-tuning of already existing components, and a few more important achievements. In the next section, I will provide some insights into the progress as well as some consideration about the status quo of Detabesu and the Encyclopedia.

* Detabesu Schema and data structure
* Detabesu usability
* Cross References
* Schema Stitching
* Universe and Canonicals
* User Contribution Alpha V1


### Detabesu schema and data structure

As we all know, the **Japanese Multimedia Industry** is a ***unique ecosystem***, full of exceptions and open to a very wide range of opinions, which makes it very difficult to manage and consolidate. Aiming for a “Design-First” approach is therefore not suitable for this specific world. With every additional data source we introduce in the system, with every new use case we face, and with every new component we develop, the whole design of the data structure and data management has to be *rediscussed and fine-tuned*.

What we aim to achieve with Detabesu is not only the consolidation of the information about the Japanese Multimedia Contents but the consolidation of the data structure itself.

```
What is an Anime? 
What is a One-Shot? 
Is a Manwhua still a Manga? 
Are Web-Toons considered Japanese Multimedia Contents? 
What is the meaning of Doujinshi and how can we categorize them?
```

Those are some of the questions we want Detabesu to be able to answer using a well documented and universally accepted standard, a standard we decided to build from scratch with the help of the community.


### Detabesu usability

The potential of Detabesu is bound to the underlying Graph Database "Dgraph", an experimental Database Animeshon decided to use because of its native GraphQL implementation. With being Detabesu an **experimental project** build on top of another **experimental technology**, we are well aware of the current limitations of our GraphQL endpoints. One simple example is the impossibility to sort results by name or by date at query time, or the complexity a developer has to face to filter a particular Media type (e.g. `give me only the Visual Novels related to this content`).

We plan to ease some of the limitations mentioned by constantly updating the Detabesu internal data structure and GraphQL endpoints. Nevertheless, we are still bound to the underlying Dgraph development cycle, which fortunately is going in a very interesting direction, as this [Feature Request](https://discuss.dgraph.io/t/ordering-by-nested-field/12613) proves.

**We strongly believe that our choice of using Dgraph will pay off in the long run. Even at the current beta phase, even if not complete, and even if the data structure is not stable, the querying power of Detabesu has no equal in the industry.**


### Cross References

During this development iteration, we put a huge effort into the improvement of the cross references across our data and external sources.

The first large improvement is the **redesign of the concept of cross referencing itself**: we concluded that the current status of external sources does not allow a 1 to 1 cross-referencing, and therefore we updated our data structure to be able to capture and handle edge cases.

One simple example comes from the classification of `Kizumonogatari` across multiple websites: 
**AniDB** considers the 3 movies as one single big anime, while other services like **MyAnimeList** splits the story into 3 different Anime (with subtype Movie).
There are many other corner cases where **MyAnimeList** *groups* what **AniDB** and **AnimeNewsNetwork** *divide*, or some hybrid mismatch are observed.

We changed our concept of cross referencing, allowing it to express partial cross references across external sources and Animeshon.
For instance, the above example of `Kizumonogatari` has been solved by ***linking every Movie of MyAnimeList to Animeshon’s resources, and partially linking AniDB’s extended Anime to Animeshon’s resource***.

Searching for AniDB’s `Kizumonogatari` cross reference in Detabesu, you will get 3 cross reference nodes, pointing to Animeshon’s resources, with the flag `partial` set as **true**,
while traversing Animeshon’s `Kizumonogatari - Nekketsu` node you will find the cross reference to MyAnimeList's `Kizumonogatari - Nekketsu` Anime with the flag `partial` set as **false** and AniDB’s `Kizumonogatari` Anime with the flag `partial` set as **true**.

![Cross Reference structure](/blog/2021-02-14-dev-log-1/cross-reference.svg)
###### *Cross Reference structure*

We spent a lot of time improving the algorithm responsible for the cross reference generation. We invested a lot in this process because at release time the algorithm was too simple and couldn’t automatically detect most of the cross references, leaving the operators (we) with 35k+ Manga, 20k+ Light Novels, and 250k+ Characters to cross reference manually to be approved or discarded.

Taking advantage as much as possible of the cross references available in external sources (AniDB provides a good amount of Anime cross references, and MangaDex has an extraordinary amount of manga cross references), and making the algorithm smarter, we were able to lower the number to few thousand cross references left for manual approvals (doujinshi excluded, as they have the most chaotic data structure and the worst data quality).

| Manga | Anime | Light Novel | Character 
| - | - | - | - 
| 35k+ | 3k+ | 20k+ | 250k+

*Number of Cross References waiting to be manually approved across ALL sources at `Beta Release`*


| Manga | Anime | Light Novel | Character 
| - | - | - | - 
| 17k+ | 700+ | 1.8k+ | 130k+ 

*Number of Cross References waiting to be manually approved across ALL sources at `V21.02 Release`*

The result of this operation is a more complete dataset available in production.


### Schema Stitching

Schema stitching means taking more than one database containing different data and merging their endpoints, giving the external world the illusion that we have only one very big database serving a **big data graph**.

In the current version of Detabesu, the Query `querySearch`, asking for information to an Elasticsearch cluster, returns a list of IDs, which have to be used again with Detabesu to retrieve the information. This leads to quite some delay (data have to be received from the Elasticsearch processed and re-sent to Detabesu) and a lot of boiler plating on the client-side to transform the list of IDs in a new request.

Thanks to schema stitching, this task will be interpolated directly in our GraphQL Gateway (available [here](http://play.animeshon.com/)) and the whole process is transparent to the outer world: the `querySearch` after Beta v21.02 release returns an array of Search Results, which can be expanded to actual types in a single query.

###### *Beta Release*

![Beta Release](/blog/2021-02-14-dev-log-1/stitching-before.svg)


###### *v21.02 Release*

![v21.02 Release](/blog/2021-02-14-dev-log-1/stitching-after.svg)


While it might seem like a very small achievement, it will serve as the foundation for the development of our ecosystem, where Ashen will be directly plugged in Detabesu and where the Animeshon Media Platform can integrate Detabesu knowledge. 

While behind the scenes there will be a lot of different services and architectures, the outer world will see a single, organized graph, traversable in any direction without the need for additional client-side custom logic.


### Universe and Canonicals

A very important achievement of this development iteration is the first generation of the **Universes and Canonicals**.

This milestone is quite important to us for 2 main reasons:
- It is the first unique value Detabesu brings to the user
- It is the first time Animeshon generates brand new information instead of processing and providing already existing data

**Definition:**

We defined Universes as a set of content sharing the same base-story, characters, or references. e.g. `Science Adventure Series` is a universe which groups the Steins;Gate story, Chaos;Head story, Chaos;Child story, etc. The contents in the universe share elements, stories, or events that are relevant to each other in one way or another.

We defined Canonicals (or Series) as a set of content about the SAME story. e.g. `Steins;Gate` is a Canonical grouping of all Anime, Visual Novels, Manga, and Drama CDs about the events of Okabe Rintarou (spoiler alert...from the first two episodes) creating a time machine by chance, and struggling to achieve the world line called Steins;Gate.

We tried to utilize already known information to automatically generate universes and canonicals, but because the concept is relatively new, and, before Detabesu, the definition was blurry, we ended up spinning up a back office that allows moderators to manually generate universes and canonicals in a few minutes. We also discarded, for now, their automatic generation because our dataset is still not good enough to tell where a universe starts, where a canonical ends, and which contents are a cross-over between different universes/canonicals. 

It is very hard to tell to an application that `Naruto` and `Boruto` are in the same universe, but they are 2 different stories and therefore 2 different canonicals even if `Boruto` is marked as the `sequel` of Naruto Shippuden :(

![Universe & Canonical Back-Office](/blog/2021-02-14-dev-log-1/universe-generator.svg?style=centerme)

###### *Universe & Canonical Back-Office Preview*

Note: At 21.02 Release, only few universes and canonical will be served since we first want to validate our concept.
The test Universes and Canonicals are:

* Monogatari Series
* Science Adventure Series
* Re:Zero
* Neon Genesis Evangelion

### User Contribution Alpha V1

The manual generation of universes and canonicals brings us to the last but most important achievement of this development iteration:
**Detabesu is no longer a read-only database**, but it allows external and manual addition of information to the dataset.

Until now, all the data Detabesu serves was the result of a very long, very complex, and automated pipeline. We instructed the process about how to parse, organize, and merge the data, and the pipeline was doing everything on its own. No human interaction was needed or ALLOWED.

With universes and canonicals, we’ve placed the first stone for user contributions.

Right now user contributions are limited to 2 single entities, it is not user friendly, and it requires a good degree of knowledge of the system. But still, we can add and edit information while preserving the automatic pipeline (internally called Wormhole because of the magic of eating raw unstructured data at one extremity and producing Animeshon’s base knowledge at the other end), making the dream of a Community-driven Encyclopedia/Ecosystem more real.



### Next Steps

The development of Animeshon’s ecosystem will continue in different directions.

We want to prioritize the release of the prototype of the **Media Platform** where creators, translators, and consumers will find a green field where to build the first circular economy of the Japanese Multimedia Industry.

Login, Signup, and user management have maximum priority and as soon as an Alpha version is ready we want to test it against the Encyclopedia building a simple Contribution manager and a Tracking system integrated into Detabesu and the Encyclopedia.

Most of the components needed from the Media Platform are required by the encyclopedia as well, therefore while the development of Detabesu and Encyclopedia will be put on hold for a short period, both to wait for Dgraph’s updates and to gather feedback about the v21.02 release, their development will not stop completely.

We also have big plans for Ashen, which should be revamped, transferred to a new, more scalable technology, be made more usable for developers, and integrated into the same data graph of Detabesu. We are also looking forward to the potential of a possible combination of Detabesu, [Ashen](https://source.animeshon.com/), and the [Danbooru2020](https://www.gwern.net/Danbooru2020) trained image indexer AI which might be explored as soon as the manpower will increase.

Regarding Detabesu, once the Media Platform is Alpha-ready, we plan to allocate efforts to redesign the schema to better represent the industry, in particular Doujinshi and Media categorization, and to provide an easier-to-query structure, getting rid of useless interfaces, migrating to unions, and explicitly exposing the type of the resource to let the user filter by type at query time.


------

***Animeshon is growing little by little, not all our products are fully functional, and not all our services meet the standard of the industry, but as they say; Rome was not built in one night.***

Ja ne～
