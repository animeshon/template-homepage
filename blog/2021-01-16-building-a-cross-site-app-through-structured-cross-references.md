---
path: '/blog/building-a-cross-site-app-through-structured-cross-references/'
slug: 'building-a-cross-site-app-through-structured-cross-references'
publishedAt: '2021-01-16'
author: Christian Roggia
target: developers

title: 'Building a cross-site app through structured cross-references'
teaser: |
  Learn how to build an app that relies on multiple data sources such as
  MyAnimeList, AniDB, Baka Manga-Updates, and much more.

overline: >
  GraphQL API insight
---

# Introduction

Cross-Site References (shortly referred at as cross-references) are metadata commonly available for primary resources (such as Anime, Manga, Light Novels, and Visual Novels), actors (People, Characters, Organizations, Circles, and Conventions), and releases (Volumes, Chapters, and Visual Novel Releases).

Cross-references will provide you information about external services such as other websites (e.g. My Anime List, AniDB, VNDB, etc.) in a structured manner.

If you are looking for an answer to one or more of the following questions this is the right blog article:

- What is the ID of this Animeshon Anime/Manga/... in AniDB/MAL/VNDB?
- How do I get the MAL ID of this Anime if I know its ID in AniDB?
- How do I get the Animeshon Encyclopedia URL for this Anime/Manga/... if I know its ID in AniDB/MAL/VNDB/...?

# Query

In this section we will analyze a few examples of queries that are commonly used to fetch cross-site references.
You can try all queries described here in our [GraphQL Playground](https://graphql.animeapis.dev/graphql).

## Animeshon to External

In this first example, we will analyze how you can get the external website ID and URL from an Animeshon ID.

The resource used in this example is the anime "Re:ZERO -Starting Life in Another World-" with Animeshon ID `nVLk1Q95IPYM` and Animeshon URL `https://animeshon.com/e/Re_ZERO_Starting_Life_in_Another_World_-Anime-nVLk1Q95IPYM`.

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    crossrefs {
      externalID
      kind
      namespace
      website {
        formattedAddress
      }
    }
  }
}
```

The response to the previous query is the following, note that cross-site references are returned for `anidb.net`, `animenewsnetwork.com`, and `myanimelist.net`:

```json
{
  "data": {
    "getAnime": {
      "crossrefs": [
        {
          "externalID": "31240",
          "kind": "Anime",
          "namespace": "myanimelist-net",
          "website": {
            "formattedAddress": "https://myanimelist.net/anime/31240"
          }
        },
        {
          "externalID": "17360",
          "kind": "Anime",
          "namespace": "animenewsnetwork-com",
          "website": {
            "formattedAddress": "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=17360"
          }
        },
        {
          "externalID": "11370",
          "kind": "Anime",
          "namespace": "anidb-net",
          "website": {
            "formattedAddress": "https://anidb.net/anime/11370"
          }
        }
      ]
    }
  }
}
```

## External to Animeshon

In this second example, we will analyze how you can get the Animeshon ID from an external website ID.

The resource used in this example is still the anime "Re:ZERO -Starting Life in Another World-" with AniDB ID `11370` and AniDB URL `https://anidb.net/anime/11370`.

```graphql
{
  queryCrossReference(filter: {externalID: {eq: "11370"}, and: {namespace: {eq: "anidb-net"}}}, first: 1) {
    content {
      ...on Anime {
        id
      }
    }
  }
}
```

The response to the previous query is the following:

```json
{
  "data": {
    "queryCrossReference": [
      {
        "content": {
          "id": "nVLk1Q95IPYM"
        }
      }
    ]
  }
}
```

## External to External via Animeshon

In this final example, we will analyze how you can get the external website ID and URL (MAL ID) from a different website (AniDB) by using Animeshon.

The resource used in this example is still the anime "Re:ZERO -Starting Life in Another World-" from AniDB.

```graphql
{
  queryCrossReference(filter: {externalID: {eq: "11370"}, and: {namespace: {eq: "anidb-net"}}}, first: 1) {
    content @cascade {
      ...on Anime {
        crossrefs(filter: {namespace: {eq: "myanimelist-net"}}) {
          externalID
          kind
          namespace
          website {
            formattedAddress
          }
        }
      }
    }
  }
}
```

The response to the previous query is the following, please note that we filtered only the MyAnimeList cross-reference:

```json
{
  "data": {
    "queryCrossReference": [
      {
        "content": {
          "crossrefs": [
            {
              "externalID": "31240",
              "kind": "Anime",
              "namespace": "myanimelist-net",
              "website": {
                "formattedAddress": "https://myanimelist.net/anime/31240"
              }
            }
          ]
        }
      }
    ]
  }
}
```

# Conclusion

If your application or website requires information from multiple websites and you need a fast and flexible way to fetch such cross-site references, then Animeshon is the perfect fit for you. We currently have over 12 million cross-references with more being added every day, on top of that Animeshon provides you with this information through simple interfaces that can be easily integrated in your service.