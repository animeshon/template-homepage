---
path: '/blog/filtering-localized-text-for-multilanguage-apps-using-graphql/'
slug: 'filtering-localized-text-for-multilanguage-apps-using-graphql'
publishedAt: '2021-01-06'
author: Christian Roggia
target: developers

title: 'Filtering localized text for multi-language apps using GraphQL'
teaser: |
  Learn how to take advantage of text localization to build a simple app
  with multi-language support and language fallback system.

overline: >
  GraphQL API insight
---

# Introduction

In this article we will introduce the basic concepts required to build a multi-language application or website with Animeshon.

The first part will analyze how information can be easily fetched from our APIs, it then continues to the second part where you will learn how you can filter only the information required by your service, and finally all the types exposed by GraphQL will be described in-depth.

If you are looking for an answer to one or more of the following questions this is the right blog article:

- How can I get the name/description/alias/... of the anime/manga/ligth-novel/visual-novel/person/organization/... X in English/Romaji/Japanese/...?
- How can I get a text in both Simplified and Traditional Chinese?
- How can I get a text in both Mandarin and Cantonese?
- How can I get a text in English with fallback to Romaji?
- How can I know which script (aka alphabet) was used for a specific text?
- How can I know whether a text is country-specific (e.g. Brazilian Portuguese and Standard Portuguese)?

# Queries

In this section we will analyze a few examples of queries that are commonly used to fetch localized texts.
You can try all queries described here in our [GraphQL Playground](https://play.animeshon.com/).

## Alpha-3

Animeshon APIs allow you to fetch texts and localizations in the format required by your own application.
In the following example we are fetching all the names of the anime "Re:ZERO -Starting Life in Another World-" and we request the result to be in the default format (i.e. ALPHA-3 countries, ALPHA-3 languages, and TEXT scripts).

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    names {
      text
      localization {
        tag
        country {
          code
        }
        language {
          code
        }
        script {
          code
        }
      }
    }
  }
}
```

The (truncated) response to the previous query is the following, please note that not always languages, countries, or scripts are set.
An explanation why this is the case is that "Generic Chinese" (zho-Hans) is not spoken in one specific country but in multiple and therefore we cannot provide a single region in the query results. Your application should be ready to handle such cases as they are very common (think about Chinese, English, Portuguese, etc.).

```json
{
  "data": {
    "getAnime": {
      "names": [
        {
          "text": "Re: 从零开始的异世界生活",
          "localization": {
            "tag": "zho-Hans",
            "country": null,
            "language": {
              "code": "zho"
            },
            "script": {
              "code": "Hans"
            }
          }
        },
        {
          "text": "Re:Zero kara Hajimeru Isekai Seikatsu",
          "localization": {
            "tag": "jpn-Latn",
            "country": null,
            "language": {
              "code": "jpn"
            },
            "script": {
              "code": "Latn"
            }
          }
        },
        {
          "text": "Re：從零開始的異世界生活",
          "localization": {
            "tag": "zho-Hant",
            "country": null,
            "language": {
              "code": "zho"
            },
            "script": {
              "code": "Hant"
            }
          }
        },
        {
          "text": "Re:ZERO -Starting Life in Another World-",
          "localization": {
            "tag": "eng",
            "country": null,
            "language": {
              "code": "eng"
            },
            "script": {
              "code": "Latn"
            }
          }
        },
        {
          "text": "Re：ゼロから始める異世界生活",
          "localization": {
            "tag": "jpn",
            "country": {
              "code": "JPN"
            },
            "language": {
              "code": "jpn"
            },
            "script": {
              "code": "Jpan"
            }
          }
        }
      ]
    }
  }
}
```

## Query: Alpha-2

Sometimes you might want to get just the country and language in ALPHA-2 representation (e.g. "jp", "de", "en") and this is possible simply by changing the previous query to match our requirements. Please note that ALPHA-2 is an older standard that got replaced as it was not granular enough, if you choose to use ALPHA-2 you won't be able to differentiate between some languages such as Generic Chinise, Mandarin, and Cantonese.

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    names {
      text
      localization {
        country {
          alpha2
        }
        language {
          alpha2
        }
      }
    }
  }
}
```

The (truncated) response to the previous query is the following:

```json
{
  "data": {
    "getAnime": {
      "names": [
        {
          "text": "Re: 从零开始的异世界生活",
          "localization": {
            "country": {
              "alpha2": null
            },
            "language": {
              "alpha2": "zh"
            }
          }
        },
        {
          "text": "Re:Zero kara Hajimeru Isekai Seikatsu",
          "localization": {
            "country": {
              "alpha2": null
            },
            "language": {
              "alpha2": "ja"
            }
          }
        },
        {
          "text": "Re：從零開始的異世界生活",
          "localization": {
            "country": {
              "alpha2": null
            },
            "language": {
              "alpha2": "zh"
            }
          }
        },
        {
          "text": "Re:ZERO -Starting Life in Another World-",
          "localization": {
            "country": {
              "alpha2": null
            },
            "language": {
              "alpha2": "en"
            }
          }
        },
        {
          "text": "Re：ゼロから始める異世界生活",
          "localization": {
            "country": {
              "alpha2": "JP"
            },
            "language": {
              "alpha2": "ja"
            }
          }
        }
      ]
    }
  }
}
```

# Filters

You can easily filter out information that you don't need, this normally doesn't create any overhead in the requests and can be safely used also in large and complex queries. Filtering out content will help you deal only with the information you need and saves us bandwidth (and therefore improves your application performance as latency will go down).

## Filter: Eq

You can filter by single fields and include only those who match a specific language:

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    names @cascade(fields: ["localization"]) {
      text
      localization @cascade(fields: ["language"]) {
        country {
          code
        }
        language(filter: {code: {eq: "jpn"}}) {
          code
        }
        script {
          code
        }
      }
    }
  }
}
```

The response to the previous query is the following:

```json
{
  "data": {
    "getAnime": {
      "names": [
        {
          "text": "Re:Zero kara Hajimeru Isekai Seikatsu",
          "localization": {
            "country": null,
            "language": {
              "code": "jpn"
            },
            "script": {
              "code": "Latn"
            }
          }
        },
        {
          "text": "Re：ゼロから始める異世界生活",
          "localization": {
            "country": {
              "code": "JPN"
            },
            "language": {
              "code": "jpn"
            },
            "script": {
              "code": "Jpan"
            }
          }
        }
      ]
    }
  }
}
```

## Filter: In

You can also filter fields to include multiple languages, in case you want to have a fallback in your application, additionally, you can filter multiple fields at the same time (in this example both language and script are filtered):

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    names @cascade(fields: ["localization"]) {
      text
      localization @cascade(fields: ["language", "script"]) {
        country {
          code
        }
        language(filter: {code: {in: ["jpn", "eng"]}}) {
          code
        }
        script(filter: {code: {eq: "Latn"}}) {
          code
        }
      }
    }
  }
}
```

The response to the previous query is the following:

```json
{
  "data": {
    "getAnime": {
      "names": [
        {
          "text": "Re:Zero kara Hajimeru Isekai Seikatsu",
          "localization": {
            "country": null,
            "language": {
              "code": "jpn"
            },
            "script": {
              "code": "Latn"
            }
          }
        },
        {
          "text": "Re:ZERO -Starting Life in Another World-",
          "localization": {
            "country": null,
            "language": {
              "code": "eng"
            },
            "script": {
              "code": "Latn"
            }
          }
        }
      ]
    }
  }
}
```

## Filter: Not

Finally, you can filter out language that you don't want to include in the response (e.g. Japanese and English):

```graphql
{
  getAnime(id: "nVLk1Q95IPYM") {
    names @cascade(fields: ["localization"]) {
      text
      localization @cascade(fields: ["language"]) {
        country {
          code
        }
        language(filter: {not: {code: {in: ["jpn", "eng"]}}}) {
          code
        }
        script {
          code
        }
      }
    }
  }
}
```

The response to the previous query is the following:

```json
{
  "data": {
    "getAnime": {
      "names": [
        {
          "text": "Re: 从零开始的异世界生活",
          "localization": {
            "country": null,
            "language": {
              "code": "zho"
            },
            "script": {
              "code": "Hans"
            }
          }
        },
        {
          "text": "Re：從零開始的異世界生活",
          "localization": {
            "country": null,
            "language": {
              "code": "zho"
            },
            "script": {
              "code": "Hant"
            }
          }
        }
      ]
    }
  }
}
```

# Types

In this last section we will analyze what each type from GraphQL represents and what are the fields that you can query.

## Texts

The `Text` field within the Animeshon APIs is used to identify virtually any text available in the database such as names, descriptions, aliases, and more. Texts have 2 non-nullable attributes which are the actual content of the text, identified by the attribute `text`, and its localization.

```graphql
type Text {
  (...)
  text: String!
  localization: Localization!
  (...)
}
```

## Localizations

The `Localization` field is at the core of multi-language support of Animeshon and implements the [BCP47](https://tools.ietf.org/html/bcp47) standard.
Animeshon implements `BCP47` using ALPHA-3 country and language identifiers which makes them non-canonical but still valid according to the standard.

Examples of tags commonly used in Animeshon are the following:

| Tag | Locale |
| --- | --- |
| jpn | Japanese |
| eng | English |
| mul-Latn | Generic Latin (e.g. the name of a person, which has no specific "language") |
| jpn-Latn | Japanese with Latin script (aka Romaji) |
| por-POR | Portuguese (Portugal) |
| por-BRA | Portuguese (Brazil) |

The structure used by `BCP47` and implemented by Animeshon is xxx-Yyyy-ZZZ where:

- `xxx` represents the language in ALPHA-3 (ISO 639-3)
- `Yyyy` represents the script (ISO 15924)
- `ZZZ` represents the country in ALPHA-3 (ISO 3166-1)

It is worth mentioning that the following additional language identifiers have been introducted as described in the `BCP47` standard:

- `mul` which is for an undefined array of languages (e.g. "mul-Latn" for any language written with latin alphabet)
- `und` for undefined languages (non-existent, not set, standard for root language)
- `zxx` as "no linguistic content" (eg. moaning, sounds, animal sounds, ...)

```graphql
type Localization {
  (...)
  tag: String!
  country: Country
  language: Language
  script: Script
  (...)
}
```

## Countries

The `Country` field implements the representation of a country according to the [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) standard.
The field `code` is choosen by default in all our services and stores the ALPHA-3 representation code of the country (e.g. `DEU`, `JPN`).
The field `alpha2` stores the ALPHA-2 representation code of the country (e.g. `DE`, `JP`).

```graphql
type Country {
  (...)
  names: [Text!]!
  code: String!
  alpha2: String
  (...)
}
```

## Languages

The `Language` field implements the representation of a language according to the [ISO 639](https://www.iso.org/iso-639-language-codes.html) standard.
The field `code` is choosen by default in all our services and stores the ALPHA-3 `ISO 639-3` representation code of the language (e.g. `deu`, `jpn`).
The field `alpha3t` stores the ALPHA-3 `ISO 639-2 (T)` representation code of the language (e.g. `ger`, `jpn`).
The field `alpha3b` stores the ALPHA-3 `ISO 639-2 (B)` representation code of the language (e.g. `deu`, `jpn`).
The field `alpha2` stores the ALPHA-2 `ISO 639-1` representation code of the language (e.g. `de`, `jp`).
The field `parent` stores the parent language (if any), an example where this field is set is Mandarin, where Chinese is the macro-language parent.

```graphql
type Language {
  (...)
  names: [Text!]!
  code: String
  alpha2: String
  alpha3t: String!
  alpha3b: String!
  parent: MacroLanguage
  (...)
}
```

The `MacroLanguage` defines the language which is is considered a macro-language and its status.

```graphql
type MacroLanguage {
  (...)
  language: Language!
  status: String!
  (...)
}
```

## Scripts

The `Script` field implements the representation of a script according to the [ISO 15924](https://www.unicode.org/iso15924/) standard.
The field `code` is choosen by default in all our services and stores the text representation code of the script (e.g. `Latn`, `Jpan`).
The field `number` stores the 3-digits representation code of the script.

```graphql
type Script {
  (...)
  names: [Text!]!
  code: String!
  number: Int!
  (...)
}
```

# Conclusion

If you are looking at building an application that requires multiple language support and advanced localization management Animeshon is the right platform to use as it implements all ISO standards and provides you with an extemely flexible and powerful query support.