// ./pages/blog/index.js
import React from 'react';
import { Link, withTranslation } from '@/root/i18n'

import Header from '@/components/Header/Header'
import BlogSection from '@/components/blog-section'
import Author from '@/components/author'

import { GetGlobalBlogCache } from '@/src/blog-cache';

import * as styles from './blog.module.scss'

const Post = ({ path, title, teaser, target, overline, author, publishedAt }) => (

  <div>
    <p className={styles['post-overline']}>{target &&<b>{target} | </b>}{overline}</p>
    <h2 className={styles['post-title']}>
      <Link href={path}>{title}</Link>
    </h2>
    <p className={styles['post-teaser']}>{teaser}</p>
    <p className={styles.info}>
      <Author name={author} className={styles.author} /> - {publishedAt}
    </p>
  </div>
)

const BlogList = ({ t, posts }) => {
  return (
    <>
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

export const getStaticProps = async () => {
  const cache = GetGlobalBlogCache();
  const posts = await cache.GetOrRefresh()

  return {
    props: {
      namespacesRequired: ['common', 'blog'],
      posts: posts
    }
  };
}

export default withTranslation('blog')(BlogList);