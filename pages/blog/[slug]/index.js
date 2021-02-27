// ./pages/blog/index.js
import React from 'react';
import cn from 'classnames';

import Header from '@/components/header/header'
import BlogSection from '@/components/blog-section'
import BlogHero from '@/components/blog-hero'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import emoji from "remark-emoji";
import gfm from "remark-gfm";
import ReactMarkdown from 'react-markdown'

import { GetGlobalBlogCache } from '@/src/blog-cache';

import { NextSeo } from 'next-seo';
import { PageSEO } from '@/root/config';

import 'github-markdown-css';
import styles from './markdown-body.module.scss';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter language={language} children={value} />
    }
}

const BlogPost = ({ post }) => {
    if (!post) return null;

    let seo = PageSEO("blog");
    // add custom fields
    seo.title = post.title;
    seo.description = post.teaser;
    seo.openGraph.title = post.title;
    seo.openGraph.description = post.teaser;
    seo.canonical = "https://animeshon.com/blog/" + post.slug;

    return (
        <>
            <NextSeo {...seo} />
            <Header />
            <BlogHero
                title={post.title}
                subtitle={post.subtitle}
                overline={post.overline}
                date={post.publishedAt}
                author={post.author}
                target={post.target}
            />
            <BlogSection>
                <div className={cn('markdown-body', styles['markdown-body'])}>
                    <ReactMarkdown plugins={[gfm, emoji]} renderers={renderers} children={post.body} />
                </div>
            </BlogSection>
        </>
    );
}

export async function getStaticPaths() {
    const cache = GetGlobalBlogCache();
    const blogPosts = await cache.GetOrRefresh();
    return {
        paths: blogPosts.filter(p => p.slug != undefined).map(p => { return { params: { slug: p.slug } } }),
        fallback: true
    };
}

export const getStaticProps = async ({ params, locale }) => {
    const cache = GetGlobalBlogCache();
    const post = cache.GetWithBody(params.slug)
    if (post == undefined) {
        return {
            notFound: true,
            revalidate: 60 * 60 * 10, // In seconds
        }
    }

    return {
        props: {
            ...await serverSideTranslations(locale, ['common']),
            post: post
        }
    };
}

export default BlogPost;