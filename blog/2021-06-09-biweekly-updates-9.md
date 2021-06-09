---
cat: update
path: '/blog/biweekly-updates-9/'
slug: 'biweekly-updates-9'
publishedAt: '2021-06-09'
author: Matteo Roggia
target: all
title: 'Bi-Weekly Updates #9'
teaser: |
  Wormhole development status, gRBAC, and training with the EU-Japan Centre programme "Get Ready for Japan"
overline: >
  Bi-Weekly Updates
---

Konnichiwa, Matteo desu.

Here we go again with another (delayed) Bi-Weekly Update.
This sprint was spent mostly consolidating and developing in alignment with decisions we took in the [previous one](/blog/biweekly-updates-8/) and attending a training about how to develop the business in Japan organized by the EU-Japan Centre, a major institution of the European Commission.

The Training, took most of Christian's time, which had to attend every day for 4-6 hours lectures online (thank you covid-19). Because of that, the development has slowed down a bit.
But fear not! He will be back on the track next week!

In general, this sprint's main milestones are:

- Refactor, check, and test of the **Crossref Manager** which is now aligned with the new data structure
- Improvement of the matching algorithm (both quality and speed)
- End-to-end test of **Wormhole**, which is now ready for a new migration
- Design and development of Animeshon's gRBAC (Graph Role Based Acces Control)
- Update of the authentication system to the newest version before the release of the public Alpha Version
- Development of custom resolvers that inject GraphQL logic in the requests made to Detabesu (which allows us to provide a cleaner and more usable public Datagraph)

Ja ne～