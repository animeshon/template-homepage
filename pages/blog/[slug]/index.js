// ./pages/blog/index.js
import React from 'react';
import { Link, withTranslation } from '@/root/i18n'

import Header from '@/components/header/header'
import BlogSection from '@/components/blog-section'
import BlogHero from '@/components/blog-hero'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import emoji from "remark-emoji";
import gfm from "remark-gfm";
import ReactMarkdown from 'react-markdown'

import { GetGlobalBlogCache } from '@/src/blog-cache';

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter language={language} children={value} />
    }
}

const BlogPost = ({ post }) => {
    if (!post) return null;

    return (
        <>
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
                <ReactMarkdown plugins={[gfm, emoji]} renderers={renderers} children={post.body} />
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

export const getStaticProps = async ({ params }) => {
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
            namespacesRequired: ['common'],
            post: post
        }
    };
}

export default withTranslation('common')(BlogPost);