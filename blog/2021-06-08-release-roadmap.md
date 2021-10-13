---
path: '/blog/release-roadmap-media-platform-2021/'
slug: 'release-roadmap-media-platform-2021'
publishedAt: '2021-06-08'
author: Christian Roggia
target: developers
title: 'Release Roadmap: Animeshon Ecosystem'
teaser: |
  What to expect in the next few months with a complete roadmap and a sneak peek at what is already here.
overline: >
  Release Roadmap
---

# Introduction

As we are getting closer to a production-ready ecosystem we would like to share the roadmap that we intend to follow in the upcoming months.

At this time we won't be giving out specific ETAs as we have observed in the past that it's hard with the current manpower to keep up with the initial expectations but nonetheless, we expect a continuous rollout of features and services as most of the core features are already implemented.

# Authentication and Authorization

Authentication is the most critical component of our infrastructures and it governs virtually every aspect of all services and features made available to the general public.

We have been through multiple iterations while trying to accommodate our needs with technologies and products already available on the market, but after a few failed attempts we have considered a different approach for what concerns authorization.

Our IAM architecture (i.e. the underlying architecture that manages identities and access control) currently relies on 3 key components to run:

- An **OAuth 2.0 and OpenID Connect Server** implemented through the open-source project [ory/hydra](https://www.ory.sh/hydra)
- An **Identity and User Management System** implemented through the open-source project [ory/kratos](https://www.ory.sh/kratos)
- An **RBAC Access Control Server** implemented through our (soon to be released) project gRBAC

These 3 components orchestrate the authentication and authorization flow of every request reaching our API endpoints.

# IAM through gRBAC

The gRBAC project is a simple yet very powerful implementation of the RBAC policy mechanism that leverages the concept of graph databases and takes advantage of Dijkstra's algorithm to find the shortest path between an object (e.g. a resource) and a subject (e.g. a user). This allows verifying whether a user has specific permission on an object in polynomial time, optimizing the lookup by expanding the graph only as necessary to answer the query.

This implementation also supports hierarchical roles and policy inheritance. That means that a resource managed by a team will inherit permissions from the team, which in turn inherits permissions from the organization. A practical example is a playlist of Visual Novels managed by the team *Moderators* of the organization *Visual-Novel.Info*, in such scenario the owner of the organization would be granted administrative access to the playlist even if he/she has not been granted direct permission on the playlist itself and does not belong to the *Moderators* team.

You can better understand hierarchical roles and inheritance works from the following diagrams:


![IAM Hierarchy](/blog/2021-06-08-release-roadmap-media-platform-2021/iam-hierarchy.jpg)

The image shown above is a representation of the IAM hierarchy.

![IAM Inheritance](/blog/2021-06-08-release-roadmap-media-platform-2021/iam-inheritance.png)

The image shown above is a representation of the IAM inheritance.

![IAM Policies](/blog/2021-06-08-release-roadmap-media-platform-2021/iam-policy-structure.png)

The image shown above is a representation of the IAM policy structure.

### Off-topic: gRBAC meaning

The name gRBAC comes from `g` + `RBAC` where `g` stands for:

- Graph as it is implemented on top of a graph database and leverages graphs properties
- gRPC as its implementation is completely gRPC native
- Google as this implementations aims at mirroring the Google Cloud IAM architecture

This project is partially complete and implements all core functionalities, it will be open-sourced shortly after been tested in a production environment.

# Asynchronous to Synchronous

The very first implementation of Detabesu was extremely asynchronous driven with around 5 different intermediate steps where Pub/Sub would be used to asynchronously publish and process messages. While this architecture was necessary for the initial version of the wormhole pipeline, it introduced a very high degree of complexity in our infrastructure. Asynchronous processing is difficult to get right and makes the whole process more error-prone and less transparent.

Since the first implementation was rolled out around a year ago we largely optimized the entire pipeline, eventually reaching the point where no asynchronous step is required anymore. Unfortunately, while the process itself has changed some core services have yet to be refactored, this doesn't mean that those legacy services don't work, it means that their implementation makes some steps unnecessarily complex.

We will be working in the next months to remove or redesign a few of those components as new features will be largely easier to implement, test, and monitor.

# Refactoring IDs and URIs

Since we released the encyclopedia, we have received multiple feedback on the IDs and URIs currently in use in both the encyclopedia UI and the Detabesu API. After some discussions with the community, we have decided that resource IDs and URIs will be changed in the next release, additionally there won't be backward compatibility with current IDs.

Following the best practices introduced by Google and Amazon, our IDs will be case-insensitive, with alphanumeric characters and no special characters.

# Introducing REST API and gRPC

A major feature that will be introduced with the upcoming release is the introduction of REST APIs as well as gRPC. GraphQL support will continue to be considered first-class and will be the main interface for browser-facing applications, Animeshon website included.

We are open-sourcing our protobuf definitions for gRPC services on github at the organization [animeapis](https://github.com/animeapis). Additionally, we already started to rollout gRPC API Client Libraries such as the [Animeshon APIs Client Library for Go](https://github.com/animeapis/api-go-client) and we plan to support the most popular programming language such as C#, Java, Python, and NodeJS. This will help to make the experience of third-party users much better and speed up the implementation of new applications while reducing implementation errors.

REST calls are transcoded into gRPC calls on the fly via Envoy, therefore there won't be a REST implementation of our services but traditional JSON + REST calls will still be supported.

# Roadmap

Now that we introduced some of the technologies soon to be released, we present the actual roadmap of releases with associated outstanding tasks or issues that, once solved, will allow for the release to be made publicly available.

## Release 1: User registration with minimal features

This release will include basic registration and login functionalities and will be the topmost important feature to be released to the general public.

A snapshot of this release is already available at the development addresses [signup](https://animeshon.dev/account/signup), [signin](https://animeshon.dev/account/signin), [recovery](https://animeshon.dev/account/recovery). Please note that the pages listed are in a development environment, therefore accounts will be regularly wiped and service uptime is not guaranteed at any time.

This release already includes Social Sign-In (Google, Discord, GitHub) and the traditional email + password login.

**Any feedback related to the UI, flow, bugs, or general suggestions are more than welcome.***

### Registration

- [x]  Registration UI
- [x]  Recovery UI

### Login

- [x]  Login UI
- [x]  Verification UI

### Authentication General

- [x]  Kratos API (v0.6)
- [ ]  Email UI

### Authorization

- [x]  gRBAC schema and proto
- [x]  gRBAC core endpoints
- [x]  gRBAC connectivity through internal VPC network
- [x]  gRBAC first integration with APIs
- [x]  gRBAC registration hook for newly registered users

### Other

- [x]  Identity-Aware Proxy

## Release 2: Beta version of Detabesu

This release will introduce the newer version of detabesu with the new associated schema, ID format, and image management.

### Encyclopedia

- [x]  Encyclopedia UI aligned with the new schema

### Detabesu

- [x]  Initial support of active changes (user contributions)
- [x]  Refactor of Doujinshi - data will be merged into Manga
- [x]  Refactor of Circles - data will be merged into Organizations
- [x]  Removal of the provider [doujinshi.org](https://www.doujinshi.org/)
- [x]  Migration of images from detabesu to the Image API
- [x]  End-to-End migration of data with the new schema

### Image API

- [x]  Implementation with gRPC
- [x]  Persistent layer
- [x]  Management of *restricted* images
- [x]  Support for both system-defined and user-defined annotations
- [x]  Support for thumbnail generation on-the-fly
- [x]  Support for cache images and thumbnails
- [x]  Migration to the new cluster
- [x]  Google Cloud CDN integration [#1387](https://github.com/kubernetes/ingress-gce/pull/1387)
- [x]  Integration with Vision API from Google Cloud for SafeSearch annotations

### CrossRefs API

- [x]  Migration to the new cluster
- [x]  Refactor of the matching algorithm
- [x]  Implementation with gRPC (in progress)
- [x]  Refactor to remove asynchronous operations

### GraphQL Gateway

- [x]  Added custom resolvers for languages
- [x]  Added custom resolvers for cross-references lookup
- [x]  Schema stitching with new services (e.g. Image API)
- [x]  Gateway aligned with the new schema

## Release 3: IAM integration with the Gateway and UI

This release will introduce IAM globally and will be integrated with rate limiters as well as the website UI.

- [x]  Gateway integration with IAM
- [ ]  Rate Limiters integration with IAM
- [ ]  UI integration with IAM
- [ ]  Initial browser-facing IAM APIs to allow for access control

## Release 4: Contribution APIs and UI

This release will introduce user contributions and finally allow for a dynamic update of existing content and the insertion of new titles.

- [x]  Contribution UI
- [ ]  Knowledge API

## Release 5: User APIs and Management

This release will introduce the most prominent features required by the users to enjoy the services available on Animeshon.

### User Interface

- [x]  User Profile UI
- [x]  Tracker UI
- [x]  Library UI

### APIs

- [ ]  Identity API
- [ ]  Tracker API
- [x]  Library API

### General

- [ ]  Statistics and data collection (likes, views, actions, ...)

## Release 6: Introduction of Service Accounts via OAuth 2.0

This release will introduce service accounts and full IAM and permissions support. This release is target at developers who are interested in integrating with our public services.

### User Interface

- [ ]  OAuth Apps UI

### APIs

- [x]  Hub API
- [x]  IAM API

### Integration

- [x]  OAuth 2.0 + Service Accounts

## Release 7: Media platform in Alpha Version

### User Interface

- [x]  Add Content UI
- [x]  Content Reader UI
- [ ]  Creators dashboard and statistics UI

### APIs

Yet to be defined as most of the UI functionalities rely on existing APIs.
