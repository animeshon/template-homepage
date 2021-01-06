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

        {/* General */}
        <title>Animeshon</title>
        <link rel="canonical" href={`https://animeshon.com/`} />

        {/* SEO */}
        {/* <meta name="description" content={``} /> */}

        {/* Social Media & SEO */}
        {/* <meta property="og:site_name" content={seo.site}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={seo.image.uri} />
        <meta property="og:url" content={url} /> */}

        {/* Twitter */}
        {/* <meta name="twitter:card" content={seo.image ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:site" content="@AnimeshonSNS" />
        <meta name="twitter:creator" content={seo.twitter} />
        <meta name="twitter:image:alt" content={seo.title} /> */}

        {/* Facebook */}
        {/* <meta property="fb:app_id" content="your_app_id" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

AnimeshonAbout.getInitialProps = async (appContext) => {
  return { ...await App.getInitialProps(appContext) }
}

export default appWithTranslation(AnimeshonAbout);
