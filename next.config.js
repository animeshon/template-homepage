const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const withImages = require('next-images')

module.exports = withImages({
    basePath: basePath,
    assetPrefix: assetPrefix,

    async rewrites() {
        return [

        ]
    },
});