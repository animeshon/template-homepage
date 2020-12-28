import React from 'react';
import App from 'next/app'
import Head from 'next/head';

import { appWithTranslation } from '@/root/i18n'

import '../styles/reset.scss';
import '../styles/globals.scss';
import '../styles/grid.scss';

import '../styles/themes/default.scss'
import '../styles/typography.scss'

const AnimeshonAbout = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

AnimeshonAbout.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default appWithTranslation(AnimeshonAbout);
