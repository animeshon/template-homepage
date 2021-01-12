import React, { ReactNode } from 'react'

// import { Menu, IconMenu } from './header'
// import Announcement from './announcement'
import Footer from './footer'

import Header from '@/components/header/header'

// const defaultMenu: Menu = [
//   { title: 'Docs', href: '/docs' },
//   { title: 'Blog', path: '/blog' },
//   { title: 'Jobs', href: 'https://github.com/ory/jobs' },
//   {
//     title: 'Support',
//     href: 'https://github.com/ory/open-source-support/blob/master/README.md'
//   }
// ]

// const defaultIconMenu = ({
//   githubLink = 'https://github.com/ory',
//   discussionsLink
// }: {
//   discussionsLink?: string
//   githubLink?: string
// }): IconMenu => {
//   if (discussionsLink) {
//     return [
//       { title: 'Chat', href: 'https://www.ory.sh/chat' },
//       { title: 'Discussions', href: discussionsLink },
//       { title: 'GitHub', href: githubLink }
//     ]
//   }

//   return [
//     { title: 'Chat', href: 'https://www.ory.sh/chat' },
//     { title: 'GitHub', href: githubLink }
//   ]
// }


const comp = [
  {
    items: [
      {
        title: 'Privacy',
        href: 'https://www.iubenda.com/privacy-policy/48776658'
      },
      {
        title: 'Cookie',
        href: 'https://www.iubenda.com/privacy-policy/48776658/cookie-policy'
      },
      {
        title: 'Terms',
        href: 'https://www.iubenda.com/terms-and-conditions/48776658'
      },
      {
        title: 'Contacts',
        href: 'https://www.animeshon.com/animeshon/contacts'
      },
      {
        title: 'License',
        href: 'https://www.animeshon.com/animeshon/license'
      },
      {
        title: 'Legal',
        href: 'https://animeshon.com/blog/information-transparency-italian-public-administration'
      }
    ]
  }
]

const menu = [
  {
    title: 'Community',
    items: [
      {
        title: 'Twitter',
        href: 'https://twitter.com/animeshonsns'
      },
      {
        title: 'Discord',
        href: 'https://discord.gg/WvNsjtR'
      },
      {
        title: 'Reddit',
        href: 'https://www.reddit.com/r/animeshon/'
      },
      {
        title: 'Patreon',
        href: 'https://www.patreon.com/animeshon'
      },
    ]
  },
  {
    title: 'Developers',
    items: [
      {
        title: `GitHub`,
        href: 'https://github.com/animeshon'
      },
      {
        title: 'Documentation',
        href: 'https://docs.animeshon.com/'
      },
      {
        title: 'Playground',
        href: 'https://play.animeshon.com/'
      },
      {
        title: 'Blog',
        href: 'https://animeshon.com/blog'
      }
    ]
  }
];

const Layout = ({
  children,
  // menu = defaultMenu,
  // icons = defaultIconMenu,
  // announcement,
  theme
}) => (
  <div className={`theme-${theme}`}>
      {/* {announcement ? <Announcement>{announcement}</Announcement> : null} */}
      <Header theme={theme} />
      <main>{children}</main>
      <Footer menu={menu} comp={comp}/>
  </div>
)

export default Layout
