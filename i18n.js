import NextI18Next from 'next-i18next';
import path from 'path';

module.exports = new NextI18Next({
    otherLanguages: [],
    localePath: path.resolve('./public/static/locales')
})