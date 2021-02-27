// ./pages/blog/index.js
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Header from '@/components/header/header'
import BlogSection from '@/components/blog-section'
import Author from '@/components/author'

import { GetGlobalBlogCache } from '@/src/blog-cache';

import * as styles from './blog.module.scss'

import { NextSeo } from 'next-seo';
import { PageSEO } from '@/root/config';

const Post = ({ path, title, teaser, target, overline, author, publishedAt }) => (
  <div>
    <p className={styles['post-overline']}>{target && <b>{target} | </b>}{overline}</p>
    <h2 className={styles['post-title']}>
      <Link href={path}>{title}</Link>
    </h2>
    <p className={styles['post-teaser']}>{teaser}</p>
    <p className={styles.info}>
      <Author name={author} className={styles.author} /> - {publishedAt}
    </p>
  </div>
)

const BlogList = ({ posts }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <NextSeo {...PageSEO("blog")}/>
      <Header />
      <BlogSection overrideStyles={{ paddingTop: 32, paddingBottom: 32 }}>
        <h1 className={styles['page-title']}>{t('blogList_title')}</h1>
        <div className={styles['post-list']}>
          {posts.map(p => (
            <div key={p.path} className={styles['post-item']}>
              <Post {...p} />
            </div>
          ))}
        </div>
      </BlogSection>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const cache = GetGlobalBlogCache();
  const posts = await cache.GetOrRefresh()

  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      posts: posts
    }
  };
}

export default BlogLists;