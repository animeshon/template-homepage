import React, { StrictMode } from 'react';
import { withTranslation } from '@/root/i18n'

import Header from '@/components/Header/Header'
import Hero from '@/components/hero'
import Stats from '@/components/stats';
import Newsletter from '@/components/newsletter';
import ThinProjectList from '@/components/thin-project-list'
import BlogSummarySection from '@/components/blog-summary-section'
import Partners from '@/components/partners'
import Timeline from '@/components/vertical-timeline'

import { GetGlobalBlogCache } from '@/src/blog-cache';

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
    title: "Canonicals and Universes",
    subtitle: "Find related content and media!",
    description: "Content will be groupd through a hierarchical structure that includes universes and canonical franchises.",
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
    action: 'Search in our graph database',
    title: 'Search in one place',
    description:
      'Search your favorite content through over 2 million official and independent Anime, Manga, Light-, and Visual- Novels.',
    href: 'https://animeshon/encyclopedia',
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/lf30_editor_Poez3y.json'),
    }
  },
  {
    id: '2',
    action: 'Explore universes and canonicals',
    title: 'Explore multiple universes',
    description:
      'Explore all stories and media that belongs to the same universe through highly interconnected graphs and timelines.',
    href: '/hydra',
    // visual: hydraAnimation
  },
  {
    id: '3',
    action: 'Sync all your lists now',
    title: 'Track all your lists',
    description:
      'Import and export all tracking lists from your favorite websites - or build your own directly on Animeshon.',
    href: '/hydra',
    // visual: hydraAnimation
  },
  {
    id: '4',
    action: 'Start reading new titles',
    title: 'Read independent titles',
    description:
      'Read independent stories directly from our community of content creators - our network promotes legal distribution and translations.',
    href: '/hydra',
    // visual: hydraAnimation
  },
];

const newsletter = {
  title: "Stay up to date",
  description: "Animeshon is constantly evolving with new technolgies always under development. Subscribe to our newsletter for official announcements."
}

const Developers = ({ dataLang, blogPosts }) => {
  const showablePosts = blogPosts.slice(0, 3);
  return (
    <StrictMode>
      <div className={`theme-default`}>
        <main>
          <Header />

          <Hero
            fullpage={showablePosts.length == 0}
            title="This part of the page will be removed"
            subtitle="It will be replaced with a search bar or a console for developers."
            cta={[]}
          />
          {showablePosts.length && <BlogSummarySection posts={showablePosts}/>}
          <Partners onlyFeatured={true} />
          <ThinProjectList projects={projects} />
          <Timeline events={timeline.events} header={timeline.header} />
          <Stats stats={stats.numbers} header={stats.header} />
          <Newsletter title={newsletter.title} description={newsletter.description} />
        </main>
      </div>
    </StrictMode>
  )
}

export const getServerSideProps = async () => {
  const cache = GetGlobalBlogCache();
  const blogPosts = await cache.GetOrRefresh()
  return {
    props: {
      blogPosts: blogPosts,
      namespacesRequired: ['common'],
    }
  }
}

export default withTranslation('common')(Developers);