---
cat: update
path: '/blog/biweekly-updates-12/'
slug: 'biweekly-updates-12'
publishedAt: '2021-08-09'
author: Christian Roggia
target: all
title: 'Bi-Weekly Updates #12'
teaser: |
  Website dark mode, encyclopedia alignment, a brand new content delivery network (CDN), and a fresh update of trackers.
overline: >
  Bi-Weekly Updates
---

Guten Tag.

Here we go with another bi-weekly, today we are finally on time (heh).

The past 2 (**3**) weeks have been more productive than ever, with a short interruption last week where every single member of Animeshon was on vacation. We are now enjoying a boost in productivity as Fábio is getting familiar with the architecture and development of new services.

Today we have (as usual) a list of changes that are helping us get closer to the release of the new encyclopedia, an important milestone that we are looking forward since a few months now.

- The alignment of the encyclopedia with the GraphQL schema is nearly complete, a bugfix session will follow now
- The Image API is finally online with the new CDN serving images and thumbnails, we are preparing to shut down the old CDN
- Following some of your feedback, the dark mode has been implemented in the new user interface
- The new UI implements now Progressive Web-App functionalities
- The Tracker API has been updated to welcome shared trackers (watch anime with your friends) and re-watch features
- IAM has been tested with the first service and appears to be stable and well-tested

Additionally, we have open-sourced our gRBAC policy system at [grbac/grbac](https://github.com/grbac/grbac). This repository marks for us a step forward in open-sourcing more projects developed at Animeshon.

![gRBAC - Graph Role-Based Access Control](/blog/2021-08-09-biweekly-updates-12/grbac.png)

With these updates almost all bullet points in the [Release Roadmap](/blog/release-roadmap-media-platform-2021/) have been completed for the planned **Release 1** and **Release 2**, this is a huge step forward as they are by far the largest and most complex releases.


Bis bald.