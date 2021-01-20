import React from 'react';
import { withTranslation } from '@/root/i18n'

import Layout from '@/components/layout'
import Hero from '@/components/hero'
import Stats from '@/components/stats';
import Newsletter from '@/components/newsletter';
import ThinProjectList from '@/components/thin-project-list'
import BlogSummarySection from '@/components/blog-summary-section'
import Partners from '@/components/partners'
import Timeline from '@/components/vertical-timeline'
import ClientPlayground from '@/components/client-playground'

import { GetGlobalBlogCache } from '@/src/blog-cache';

import { NextSeo } from 'next-seo';
import { PageSEO } from '@/root/config';

const timeline = {
  "header": {
    title: "What comes next?"
  },
  "events": [{
    id: "1",
    highligthArrowStyle: { borderRight: '7px solid  var(--colors-themed-default)' },
    highligthStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    date: "March 2021",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    icon: undefined,
    title: "Universes and Series",
    subtitle: "Find related content and media!",
    description: "Content will be grouped through a hierarchical structure that includes universes and series.",
  },
  {
    id: "2",
    highligthArrowStyle: { borderRight: '7px solid  var(--colors-themed-default)' },
    highligthStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    date: "April 2021",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    icon: undefined,
    title: "Community Contributions",
    subtitle: "Expand the knowledge base!",
    description: "Alpha and beta users will be allowed to contribute to the encyclopedia by editing its resources.",
  },
  {
    id: "3",
    date: "June 2021",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    title: "Accounts and Tracking Lists",
    subtitle: "Save that title for later!",
    description: "Users accounts will be available and it will be possible to start syncing watch-, read-, and play- tracking lists.",
  },
  {
    id: "4",
    date: "Release date not scheduled yet",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    title: "Release of the Media Platform",
    subtitle: "Read without leaving Animeshon!",
    description: "Independent content will be available directly on Animeshon. A distribution network for independent content creators and translators!",
  },
  ]
};

const stats = {
  "header": {
    title: "A growing ecosystem",
    description: `Animeshon is already the largest platform on the market and its continuous growth is only possible thanks to the global community.`,
  },
  "numbers": [
    {
      title: 'Graph edges',
      amount: 1200000000,
      description: `Overall`
    },
    {
      title: 'Indexed frames',
      amount: 2250000000,
      description: 'Estimated'
    },
    {
      title: 'Average request time',
      amount: 50,
      description: 'Milliseconds'
    }
  ],
};

const projects = [
  {
    id: '1',
    action: 'Explore GraphQL directly from your browser',
    title: 'Your graph knowledge-base',
    description:
      'Everything about Anime, Manga, Light-, and Visual- Novels is available to you from the most interconnected graph database on the planet.',
    href: 'https://play.animeshon.com/',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/developers_1.json'),
    }
  },
  {
    id: '2',
    action: 'Lookup your own screenshot',
    title: 'Anime image search at scale',
    description:
      'We can identify up to 2 billion frames from 25.000 anime episodes and provide graph knowledge such as episode and anime metadata (incl. ids and names).',
    href: 'https://source.animeshon.com/',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/developers_2.json'),
    }
  },
  {
    id: '3',
    action: 'Learn more about cross-references',
    title: 'Cross-site references',
    description:
      'We can lookup references, links, or ids from external websites and return the equivalent resource in Animeshon as well as all other known data sources.',
    href: 'https://developers.animeshon.com/blog/building-a-cross-site-app-through-structured-cross-references',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/developers_3.json'),
    }
  },
  {
    id: '4',
    action: 'Explore our integration ecosystem',
    title: 'We are integration driven',
    description:
      'We work together with research institutions and universities to make the most advanced technologies ready to be integrated by your applications.',
    href: 'https://docs.animeshon.com/docs/ecosystem/introduction',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/developers_4.json'),
    }
  },
];

const newsletter = {
  title: "Stay up to date",
  description: "Animeshon is constantly evolving with new technolgies always under development. Subscribe to our newsletter for official announcements."
}

const cta = [
  {
    title: "Docs",
    href: "https://docs.animeshon.com",
    openInNewWindow: true,
    className: "primary",
  },
  {
    title: "Try GraphQL",
    href: "https://play.animeshon.com/",
    openInNewWindow: true,
  }
]

const Target = "developers";

const Developers = ({ t, posts }) => {
  const showablePosts = posts.slice(0, 3);
  return (
    <>
      <NextSeo {...PageSEO(t, Target)}/>
      <Layout theme={Target}>
        <Hero
          theme={Target}
          fullpage={showablePosts.length == 0}
          title="Stay focused on your idea"
          subtitle="We research and develop core enterprise technologies so that you don't have to."
          cta={cta}
          // overlay={require("@/public/images/background-header.png")}
          childrenClassName={"col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-xlg-5 col-xlg-offset-1"}
        >
          <ClientPlayground />

        </Hero>
        {showablePosts.length != 0 && <BlogSummarySection posts={showablePosts} />}
        <Partners onlyFeatured={true} />
        <ThinProjectList projects={projects} />
        <Timeline events={timeline.events} header={timeline.header} />
        <Stats stats={stats.numbers} header={stats.header} />
        <Newsletter title={newsletter.title} description={newsletter.description} />
      </Layout>
    </>
  )
}

export const getStaticProps = async ({locale}) => {
  const cache = GetGlobalBlogCache();
  const posts = (await cache.GetOrRefresh()).filter(p => p.target == Target || p.target == 'all');

  return {
    props: {
      namespacesRequired: ['common'],
      posts: posts
    }
  };
}

export default withTranslation(['common'])(Developers);