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

const events = [
  {
    highligthArrowStyle: { borderRight: '7px solid  var(--colors-themed-weak)' },
    highligthStyle: { background: 'var(--colors-themed-default)', color: '#fff' },
    date: "2011 - present",
    iconStyle: { background: 'var(--colors-themed-weak)', color: '#fff' },
    icon: undefined,
    title: "Creative Director",
    subtitle: "Miami, FL",
    description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    date: "2010 - 2011",
    iconStyle: { background: 'var(--colors-themed-weak)', color: '#fff' },
    title: "Creative Director",
    subtitle: "Miami, FL",
    description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
];

const stats = [
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
];

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
          <ThinProjectList />
          <Timeline events={events} header={{title:"What comes next?"}}/>
          <Stats stats={stats}/>
          <Newsletter />
        </main>
      </div>
    </StrictMode>
  )
}

Developer.getInitialProps = async () => ({
  namespacesRequired: ['common', 'dev-page'],
})

export default withTranslation()(Developer);