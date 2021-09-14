---
cat: update
path: '/blog/biweekly-updates-14/'
slug: 'biweekly-updates-14'
publishedAt: '2021-09-14'
author: Christian Roggia
target: all
title: 'Bi-Weekly Updates #14'
teaser: |
  Production is getting ready for the public release with identities, brand new APIs, and a refactored gateway.
overline: >
  Bi-Weekly Updates
---

こんばんは!

With this update, we would like to inform our community that all services described in the release #1 and #2 of our [Release Roadmap](/blog/release-roadmap-media-platform-2021/) have been promoted to production over the past week.

This marks an important milestone for us as it shows that our infrastructure is ready to welcome more user-oriented services.
This week will be completely dedicated to finalizing the setup and migration of data endpoints and user interfaces.

Release notes with a huge changelog will be published to describe all new features and improvements introduced by this first release batch.
Expect most of the information provided to be highly technical with a special focus on Authentication/Authorization, OAuth 2.0, IAM, and IAP. Additional notes will be provided to describe our new GraphQL schema and the new pages available in the encyclopedia.

The upcoming release will also allow third parties to take advantage of service accounts to authenticate and connect to our APIs (gRPC, REST, and GraphQL).

The list of changes that we want to share with you today is the following:

- The production environment is ready with brand new infrastructure
- The development of the Identity-Aware Proxy has been completed and the proxy has been promoted to production
- IAM has been finalized and promoted to production
- The Image and Vision APIs have been promoted to production
- OAuth 2.0 is ready to welcome service accounts and has been promoted to production
- Service Accounts can be created and granted IAM roles by users
- Library API and Tracker API are ready for a final review and promotion to production
- Isekai (Contribution API) is now been refactored to align with the finalized infrastructure

Finally, we would like to announce that starting from tomorrow detabesu (encyclopedia) will go offline during a maintenance window that might last until the end of the week.

What you could be expecting in the upcoming release is to be able to create identities and service accounts, to access Vision and Image APIs which include not only image binaries but also annotations and properties, and to access the new GraphQL gateway with advanced custom resolvers and overall better performance and usability.

See you on Discord!