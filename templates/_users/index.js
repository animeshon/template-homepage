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
import UserSearch from '@/components/user-search'

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
      title: 'Official titles',
      amount: 176000,
      description: `Overall`
    },
    {
      title: 'Independent titles',
      amount: 1500000,
      description: 'Overall'
    },
    {
      title: 'External links',
      amount: 12000000,
      description: 'Overall'
    }
  ],
};

const projects = [
  {
    id: '1',
    action: 'Search in our multimedia database',
    title: 'Everything in one place',
    description:
      'Search your favorite content through millions of official and independent Anime, Manga, Light-, and Visual- Novels.',
    href: 'https://animeshon.com/e/search?q=boruto',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/users_1.json'),
    }
  },
  {
    id: '2',
    action: '(coming soon) Explore universes and series',
    title: 'Explore multiple universes',
    description:
      'Explore all stories and media that belongs to the same universe through highly interconnected graphs and timelines.',
    href: '#',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/users_2.json'),
    }
  },
  {
    id: '3',
    action: '(coming soon) Sync all your lists now',
    title: 'Track all your lists',
    description:
      'Import and export all tracking lists from your favorite websites - or build your own directly on Animeshon.',
    href: '#',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/users_3.json'),
    }
  },
  {
    id: '4',
    action: '(coming soon) Start reading new titles',
    title: 'Read independent Manga',
    description:
      'Join our community of independent content creators and make sure your favorite stories are never interrupted and always available in your language.',
    href: '#',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/users_4.json'),
    }
  },
];

const newsletter = {
  title: "Stay up to date",
  description: "Animeshon is constantly evolving with new technologies always under development. Subscribe to our newsletter for official announcements."
}

const Target = "users";

const Users = ({ t, posts }) => {
  const showablePosts = posts.slice(0, 3);
  return (
    <>
      <NextSeo {...PageSEO(t, Target)}/>
      <Layout theme={Target}>
        <Hero
          theme={Target}
          fullpage={showablePosts.length == 0}
          cta={[]}
        >
          <UserSearch />
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

export const getStaticProps = async () => {
  const cache = GetGlobalBlogCache();
  // const posts = (await cache.GetOrRefresh()).filter(p => p.target == Target || p.target == 'all');
  const posts = (await cache.GetOrRefresh()).filter(p => p.target == Target);

  return {
    props: {
      namespacesRequired: ['common'],
      posts: posts
    }
  };
}

export default withTranslation(['common'])(Users);