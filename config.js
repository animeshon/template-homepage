
export const ThemeLinks = {
    users: 'https://animeshon.com/',
    creators: 'https://creators.animeshon.com/',
    developers: 'https://developers.animeshon.com/',
}

export const EncyclopediaSearchHref = "https://animeshon.com/e/search";

// default seo at root level, can be override with PageSEO
// both DefaultSEO and PageSEO should use i18n string keys for strings
export const DefaultSEO = (t) => {
    return ({
        title: t('DefaultSEO_Title'),
        description: t('DefaultSEO_Description'),
        openGraph: {
            type: 'website',
            locale: 'en_IE',
            site_name: t('DefaultSEO_SiteName'),
            title: t('DefaultSEO_Title'),
            description: t('DefaultSEO_Description'),
        },
        twitter: {
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
        },
        images: [
            {
              url: 'https://cdn-us.animeshon.com/brand/logo-preview-seo-users.png',
              width: 1200,
              height: 627,
              alt: t('DefaultSEO_ImageAlt'),
            },
        ]
    });
};

// list of available props https://github.com/garmeeh/next-seo
export const PageSEO = (t, p) => {
    const page = {
        users: {
            title: t('SEO_UserTitle'),
            description: t('SEO_UserDescription'),
            canonical: "https://animeshon.com/",
            openGraph: {
                site_name: t('SEO_UserSiteName'),
                title: t('SEO_UserTitle'),
                description: t('SEO_UserDescription'),
            },
            images: [
                {
                  url: 'https://cdn-us.animeshon.com/brand/logo-preview-seo-users.png',
                  width: 1200,
                  height: 627,
                  alt: t('SEO_UserImageAlt'),
                },
            ]
        },
        creators: {
            title: t('SEO_CreatorTitle'),
            description: t('SEO_CreatorDescription'),
            canonical: "https://creators.animeshon.com/",
            openGraph: {
                site_name: t('SEO_CreatorSiteName'),
                title: t('SEO_CreatorTitle'),
                description: t('SEO_CreatorDescription'),
            },
            images: [
                {
                  url: 'https://cdn-us.animeshon.com/brand/logo-preview-seo-creators.png',
                  width: 1200,
                  height: 627,
                  alt: t('SEO_CreatorImageAlt'),
                },
            ]
        },
        developers: {
            title: t('SEO_DevTitle'),
            description: t('SEO_DevDescription'),
            canonical: "https://developers.animeshon.com/",
            openGraph: {
                site_name: t('SEO_DevSiteName'),
                title: t('SEO_DevTitle'),
                description: t('SEO_DevDescription'),
            },
            images: [
                {
                  url: 'https://cdn-us.animeshon.com/brand/logo-preview-seo-developers.png',
                  width: 1200,
                  height: 627,
                  alt: t('SEO_DeveloperImageAlt'),
                },
            ]
        },
        blog: {
            title: t('SEO_BlogTitle'),
            description: t('SEO_BlogDescription'),
            // canonical: "https://animeshon.com/blog/",
            openGraph: {
                site_name: t('SEO_BlogSiteName'),
                title: t('SEO_BlogTitle'),
                description: t('SEO_BlogDescription'),
            },
            images: [
                {
                  url: 'https://cdn-us.animeshon.com/brand/logo-preview-seo-users.png',
                  width: 1200,
                  height: 627,
                  alt: t('SEO_BlogImageAlt'),
                },
            ]
        }
    };
    return page[p];
}