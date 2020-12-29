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

const timeline = {
  "header": {
    title: "What comes next?"
  },
  "events": [{
    id: "1",
    highligthArrowStyle: { borderRight: '7px solid  var(--colors-themed-default)' },
    highligthStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    date: "2011 - present",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    icon: undefined,
    title: "Creative Director",
    subtitle: "Miami, FL",
    description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    id: "2",
    date: "2010 - 2011",
    iconStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    title: "Creative Director",
    subtitle: "Miami, FL",
    description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  ]
};

const stats = {
  "header": {
    title: "Adoption rate",
    description: `All of our security-relevant code is open source, and our flows and concepts are rooted in open standards and industry best practices.`,
  },
  "numbers": [
    {
      title: 'Requests secured',
      amount: 5465465,
      description: `Overall`
    },
    {
      title: 'Docker pulls',
      amount: 111111,
      description: 'Overall'
    },
    {
      title: 'GitHub stars',
      amount: 654654,
      description: 'Overall'
    }
  ],
};

const projects = [
  {
    id: 'kratos',
    title: `Kratos`,
    descriptiveTitle: 'User Management',
    description:
      'Cloud native user management system. Provision IDs, store user information, configure authentication methods and use a headless API.',
    path: '/kratos',
    links: {
      quickstart: 'https://www.ory.sh/docs/next/kratos/quickstart'
    },
    visual: {
      type: "lottie",
      data: require('@/root/public/lotties/lf30_editor_Poez3y.json'),
    }
  },
  {
    id: 'hydra',
    title: `Hydra`,
    descriptiveTitle: 'OAuth 2.0 and OpenID Connect',
    description:
      'OAuth 2.0 and OpenID Certified® OpenID Connect server. Secure access to your applications and APIs.',
    path: '/hydra',
    links: {
      quickstart: 'https://www.ory.sh/hydra/docs/5min-tutorial'
    },
    // visual: hydraAnimation
  },
];

const newsletter = {
  title: "Never miss a patch",
  description: "ORY ships regular product patches and updates. Subscribe to our newsletter to get the good stuff, and stay up to date."
}

const Developer = ({ dataLang }) => {
  return (
    <StrictMode>
      <div className={`theme-default`}>
        <main>
          <Header />

          <Hero
            title="Open Source Identity Infrastructure and Services"
            subtitle="Run User Management, Permission and Role Management, and OAuth 2.0 & OpenID Connect anywhere from your cloud to a Raspberry Pi."
            cta={[
              {
                title: 'Demo',
                href:
                  'https://docs.google.com/forms/d/e/1FAIpQLSc5sViXt5rR44MLbJM5QjSDoSiZxXaXtmkHvAg22KC-x3z1Dg/viewform',
                style: 'primary',
                openInNewWindow: true
              },
              {
                title: 'GitHub',
                href: 'https://github.com/ory',
                style: 'secondary'
              }
            ]}
          />
          <BlogSummarySection />
          <Partners onlyFeatured={true} />
          <ThinProjectList projects={projects} />
          <Timeline events={timeline.events} header={timeline.header} />
          <Stats stats={stats.numbers} header={stats.header} />
          <Newsletter title={newsletter.title} description={newsletter.description}/>
        </main>
      </div>
    </StrictMode>
  )
}

Developer.getInitialProps = async () => ({
  namespacesRequired: ['common', 'dev-page'],
})

export default withTranslation()(Developer);