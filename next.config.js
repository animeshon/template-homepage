const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const withImages = require('next-images');
const { i18n } = require('./next-i18next.config');

module.exports = withImages({
    i18n,
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }
        
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

        config.resolve.symlinks = false
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