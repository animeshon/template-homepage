---
path: '/blog/isekai-virtual-git-environment/'
slug: 'isekai-virtual-git-environment'
publishedAt: '2021-04-14'
author: Christian Roggia
target: developers
title: 'Isekai: The virtual Git environment'
teaser: |
  Meet our new technology: Isekai - A virtual Git environment for a universal access to versioned open-data information.
overline: >
  Isekai insight
---

## Introduction

Isekai is a technology developed by the Animeshon team to solve three important problems faced during the initial prototyping stage:

- Allowing users to update and add new content to the graph kwowledge-base
- Moderating new user submissions while keeping the history of changes
- Making data globally available through open-data licenses

All of this had to be accomplished while keeping the original pipeline in place to allow for new information gathering in a very similar fashion of how Google built his own Graph Knowledge-Base to improve Web Search (Learn more about [Why Google Needed a Graph Serving System](https://dgraph.io/blog/post/why-google-needed-graph-serving-system/)).

## Isekai

Isekai is a virtualized Git environment which means that repositories are stored within a highly performant key-value storage instead of the usual filesystem. This allows for bulk imports and downloads in the magnitude of millions of records per minute which is crucial for infrastructure like ours where a single change to schema specifications could end up in a full-blown migration of billions of edges. This also allows to keep data separated from the filesystem therefore making data dumps and backups feasible even for large databases.

![Isekai Overview](/blog/2021-04-13-isekai-virtual-git-environment/7.jpg)

Isekai will be exposed in Animeshon as a component of our data hub (which will be made available at the domain https://hub.animeshon.com/) allowing anyone to clone our git repositories through a simple `git clone` command from your own command line. We have a implemented a fully compatible git protocol that we will be using also internally.

## So, how does Isekai solve our issues?

Well, Isekai will be storing all documents used to generate the Graph Knowledge-Base of Animeshon in JSON format and each primary entity (e.g. Anime, Manga, Visual Novels, etc.) will have its own virtual repository. This means that anyone, anywhere on the planet will be allowed to access and clone a real-time representation of Detabesu objects. This feature by itself solves the problem of **making data globally available through open-data licenses**.

![Isekai Representation](/blog/2021-04-13-isekai-virtual-git-environment/8.jpg)

Secondly, Git is widely known to be a versioning system and this is the primary reason why we decided to use it in the first place. Git is meant to keep historical information about objects and this is a feature that will be largely used by Animeshon to make sure that previous changes never get lost. Additionally, the git protocol by design allows to keep multiple branches containing concurrent updates and to merge them together detecting any conflict that might get introduced in the process. This feature allows us to accept any incoming changes proposed by users (i.e contribution) and to keep them in a separate workspace until moderation approval, hence solving the problem of **moderating new user submissions while keeping the history of changes**.

![Isekai Advantages](/blog/2021-04-13-isekai-virtual-git-environment/9.jpg)

Finally, thanks to a simplified flow implemented behind the scenes, we have been able to develop and expose REST APIs as well as GraphQL APIs that make it very easy for any application and service, including our own website, to propose changes with a basic HTTP request and a JSON body. This makes it possible to have a user interface in front of this highly technical workflow, therefore **allowing users to update and add new content to the graph kwowledge-base**.

![Isekai Flow](/blog/2021-04-13-isekai-virtual-git-environment/10.jpg)

A REST call will be looking like the following:

```json
{
    "Metadata": {
      "Type": "Anime",
      "ID": "FjGBWNwwb9oR"  
    },
    "Type": "TV",
    "Name": [
        {
            "String": "Evangelion: 3.0 You Can (Not) Redo",
            "Localization": "eng"
        },
        {
            "String": "ヱヴァンゲリヲン新劇場版:Q",
            "Localization": "jpn"
        }
    ],
    "Casts": [
        {
            "Character": {
                "ID": "bie38Nvgrdsh",
                "Type": "Character"
            },
            "Relation": "MAIN"
        },
        {
            "Character": {
                "ID": "DESftlksjvnD",
                "Type": "Character"
            },
            "Relation": "MAIN"
        }
    ]
}
```

We are looking forward to finally making this service available to the community and we are more than happy to collect your feedback regarding this technology!

More information is available in this [PDF document](/blog/2021-04-13-isekai-virtual-git-environment/animeshon-isekai.pdf).