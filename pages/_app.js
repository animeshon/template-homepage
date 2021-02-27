import React from 'react';
import App from 'next/app'
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';

import '../styles/reset.scss';
import '../styles/globals.scss';
import '../styles/grid.scss';

import '../styles/themes/default.scss'
import '../styles/typography.scss'

import { DefaultSEO } from '@/root/config';

const Homepage = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...DefaultSEO()} />
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

export default appWithTranslation(Homepage);
