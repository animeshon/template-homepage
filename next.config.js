const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const withImages = require('next-images');

module.exports = withImages({
    webpack: (config) => {
        const oneOf = config.module.rules.find(
            (rule) => typeof rule.oneOf === 'object'
        );

        const fixUse = (use) => {
            if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
                use.options.modules.mode = 'local';
            }
        };

        if (oneOf) {
            oneOf.oneOf.forEach((rule) => {
                if (Array.isArray(rule.use)) {
                    rule.use.map(fixUse);
                } else if (rule.use && rule.use.loader) {
                    fixUse(rule.use);
                }
            });
        }

        return config;
    },
    basePath: basePath,
    assetPrefix: assetPrefix,

    sassOptions: {
        includePaths: [
            './styles',
            './styles/*',
            './components',
            './components/*',
        ],
    },

    async rewrites() {
        return [

        ]
    },
});