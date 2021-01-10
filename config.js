
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
        // canonical: '',
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
            // {
            //   url: 'https://www.example.ie/og-image-01.jpg',
            //   width: 800,
            //   height: 600,
            //   alt: t('DefaultSEO_Image1Alt'),
            // },
        ]
    });
};

// list of available props https://github.com/garmeeh/next-seo
export const PageSEO = (t, p) => {
    const page = {
        users: {
            title: t('SEO_UserTitle'),
            description: t('SEO_UserDescription'),
            // canonical: "",
            openGraph: {
                site_name: t('SEO_UserSiteName'),
                title: t('SEO_UserTitle'),
                description: t('SEO_UserDescription'),
            },
        },
        creators: {
            title: t('SEO_CreatorTitle'),
            description: t('SEO_CreatorDescription'),
            // canonical: "",
            openGraph: {
                site_name: t('SEO_CreatorSiteName'),
                title: t('SEO_CreatorTitle'),
                description: t('SEO_CreatorDescription'),
            },
        },
        developers: {
            title: t('SEO_DevTitle'),
            description: t('SEO_DevDescription'),
            // canonical: "",
            openGraph: {
                site_name: t('SEO_DevSiteName'),
                title: t('SEO_DevTitle'),
                description: t('SEO_DevDescription'),
            },
        },
        blog: {
            title: t('SEO_BlogTitle'),
            description: t('SEO_BlogDescription'),
            // canonical: "",
            openGraph: {
                site_name: t('SEO_BlogSiteName'),
                title: t('SEO_BlogTitle'),
                description: t('SEO_BlogDescription'),
            },
        }
    };
    return page[p];
}