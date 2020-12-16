import React from 'react';
import Head from 'next/head';

import '../styles/reset.scss';
import '../styles/globals.scss'

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

export default AnimeshonAbout
