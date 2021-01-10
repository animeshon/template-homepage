import React from 'react';
import App from 'next/app'
import Head from 'next/head';

//! TODO next-i18n is currently broken with server side rendere
//! refear to https://github.com/isaachinman/next-i18next/issues/869
//! and  https://github.com/isaachinman/next-i18next to kee up to date the development

import { appWithTranslation, withTranslation } from '@/root/i18n'

import { DefaultSeo } from 'next-seo';

import '../styles/reset.scss';
import '../styles/globals.scss';
import '../styles/grid.scss';

import '../styles/themes/default.scss'
import '../styles/typography.scss'

import { DefaultSEO } from '@/root/config';

const Homepage = ({ Component, pageProps, t }) => {
  return (
    <>
      <DefaultSeo {...DefaultSEO(t)} />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

Homepage.getInitialProps = async (appContext) => {
  return { ...await App.getInitialProps(appContext) }
}

export default appWithTranslation(withTranslation('common')(Homepage));
