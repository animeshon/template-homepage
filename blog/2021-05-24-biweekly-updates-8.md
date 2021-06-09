---
cat: update
path: '/blog/biweekly-updates-8/'
slug: 'biweekly-updates-8'
publishedAt: '2021-05-24'
author: Matteo Roggia
target: all
title: 'Bi-Weekly Updates #8'
teaser: |
  Wormhole development status, Detabesu revamp and planned rollout of new features.
overline: >
  Bi-Weekly Updates
---

Konnichiwa, Matteo desu.

This sprint has been more productive than expected and this update will be therefore longer.
We didn't just continue the development of our systems but we also made some quite important decisions about Wormhole and Detabesu, which are taking way too much effort to be completed.

But first thing first, let's make a bullet list to summarize the last 2 weeks:

- Refactor of 80% of the old Wormhole pipeline.
- Enhancement of the data analysis in Wormhole.
- Enhancement of the *CrossReference* matching algorithm.
- Removal of the data types *Doujinshi* and *Circle* (now part of *Manga* and *Organization*).
- Deployment of the brand new development cluster to prepare the infrastructure for the upcoming releases. 
- Started the refactor of Detabesu (more info after).
- End-to-end prototype for Isekai contributions.

We are finally approaching the point where we are able to rollout new features which will expand Animeshon's Ecosystem beyond Detabesu.
We don't plan to release everything together considering that the last few months brought a heavy refactor and many breaking changes, instead we are introducing smaller but more frequent releases (besides the first one, where we have to release the beta version of Detabesu and of the encyclopedia).

About Detabesu itself, let's be clear. We spent way too much time on it.

When we started the Detabesu project we wanted to have all the information about everything fully interconnected. The truth is that we don't have the manpower to maintain nor analyze and consolidate all the data we have. Therefore in the past few weeks, we decide to change direction and we chose to develop a leaner and cleaner version of Detabesu, more focused on Japanese Multimedia Content rather than on People, Companies, and useless details.

As an example, information like the address of an Organization, or the broadcasts of an Episode will be temporarily pruned from the final Data-Graph.

Another very important decision was to put on hold the management of [Doujinshi.org](https://www.doujinshi.org) data. After 4 different iterations we came to the conclusion that their data is too chaotic to be worth the effort of analyzing and consolidating, and since we got some data from MangaDex and nHentai we prioritize those data sources for the "Doujin" domain.

To conclude, we are close to the conclusion of the Detabesu chapter and we are very enthusiastic about the upcoming series of releases.

P.s. we apologize for the delay in the release of features like the much needed authentication, we are working 24/7 (even on weekends) to make sure to be able to provide solid and reliable services, unfortunately manpower is really limited on our side.

Ja ne～
