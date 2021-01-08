import React, { ReactNode } from 'react'

// import { Menu, IconMenu } from './header'
import Header from './header'
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
      }
    ]
  }
]

const menu = [
  {
    title: 'Resources',
    items: [
      {
        title: 'Twitter',
        href: 'https://twitter.com/animeshonsns'
      },
      {
        title: 'Discord',
        // href: 'https://www.iubenda.com/privacy-policy/48776658/cookie-policy'
      },
      {
        title: 'Reddit',
        href: 'https://www.reddit.com/r/animeshon/'
      },
      {
        title: 'Patreon',
        href: 'https://www.patreon.com/animeshon'
      },
      {
        title: 'Docs',
        href: 'docs.animeshon.com'
      },
    ]
  },
  {
    title: 'GitHub',
    items: [
      {
        title: `Animeshon`,
        href: 'https://github.com/animeshon'
      },
    ]
  }
];

const Layout = ({
  children,
  // menu = defaultMenu,
  // icons = defaultIconMenu,
  // announcement,
  headerTheme
}) => (
  <div className={`theme-default`}>
      {/* {announcement ? <Announcement>{announcement}</Announcement> : null} */}
      <Header theme={headerTheme} />
      <main>{children}</main>
      <Footer menu={menu} comp={comp}/>
  </div>
)

export default Layout
