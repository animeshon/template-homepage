---
cat: update
path: '/blog/biweekly-updates-11/'
slug: 'biweekly-updates-11'
publishedAt: '2021-07-20'
author: Fábio Ferreira [Skyborg] 
target: all
title: 'Bi-Weekly Updates #11'
teaser: |
  Animeshon is growing, basic functionality achieved in a lot of services.
overline: >
  Bi-Weekly Updates
---

Ohayo, Skyborg \[Fábio\] desu. 


I had the awesome opportunity to do an internship at Animeshon, so now I’m formally part of this project as well! It’s been a great experience, no complaints yet.  
I’ll keep protesting about late biweekly updates, so don’t worry, I’m still on your side!


First things first, to answer what everyone wants to know… yes, Matteo's english is even worse in the private repos. 
I’ll start a small piggy bank to get him a dictionary on Christmas. Not for him to read, but for Christian to smack him with it every time he makes one of these: 
>feat: ReconcileOracoloFulltextIndexes **acepts** force as **paramenter** to force reindex of **entieies** found in storage.


### Ok, some updates on things that matter now:


From my jurisdiction, the beautiful tracker! Well, if the name isn’t enough, I’ll give you a small explanation. 
The tracker service / API is responsible for remembering what content you have seen, and when. It will be where the fact that you re-watched [Darling in the FranXX](https://animeshon.com/e/Darling_in_the_FranXX-Anime-YS-5VRlRF6Is) episode 15 482 times will be recorded, so that you can reminisce about all the happy time you spent seeing best girl.

![Jumpy best girl](/blog/2021-07-20-biweekly-updates-11/jumpy02.gif)

This week the basic tracker implementation got completed and online. It currently supports basic operations (creation, deletion, listing, getting, and update), and features a basic schema with minimal information. 

A new improved version has been discussed, and its features and schemas are pretty much decided.

It will support:
- **Shared trackers** (not that you have any friends to share it with), where two or more people can update it.
- **Multiple re-watches/re-reads**, for those weirdos that saw [Eromanga Sensei](https://animeshon.com/e/Eromanga_Sensei-Anime-V6mW7BVchUPC) 7 times and want to let everyone know.
- And a **universe tracker**! Do you want to know how much of the whole of Fate universe you have watched? For starters, too little, anything below 5 re-watches of [Fate/Apocrypha](https://animeshon.com/e/Fate_Apocrypha-Anime-inJawW-CbYgs)is too little screentime for our sweet Astolfo. And secondly, with the Universe tracker you can!


The following week(s) I’ll be implementing the importing from external tracking providers, so you can join our side as smoothly as possible. It will also come with an exporter, so your pesky friends who dislike change can still see you are a weeb on the other platforms, as it will keep those in sync with Animeshon.


### On a last quick fire round:


- Graphql has been updated to the new schema 
- Frontend is being updated to the new schema which will include where to watch, read or play content 
- Migration has been completed end-to-end with new data and ids 
- Crossrefs has been rewritten and refactored to a gRPC API 
- Identity API is implementing basic functionalities 
- IAM API is implementing basic functionalities 
- Tracker API is implementing basic functionalities 
- User Inferface has been completed and must be wired to the backend APIs


This last month we were able to tick a few more checkboxes from the [Release Roadmap](/blog/release-roadmap-media-platform-2021/).
We can't wait to have you play in the new UI. Personally, I love it, and I'm eager to get it playing nice with Encyclopedia's API.


From me this is all, I hope to have some more news in two weeks (or a month...) to give you!

Mata ne ☆