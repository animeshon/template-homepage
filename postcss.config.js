module.exports = {
    plugins: {
        'lost': {},
        'postcss-custom-media': {
            importFrom: [
                {
                  customMedia: {
                    '--sm-viewport': '(max-width: 375px)',
                    '--md-viewport': '(max-width: 768px) and (min-width: 375px)',
                    '--lg-viewport': '(min-width: 769px)',
                    '--mobile-viewport': '(max-width: 768px)'
                  }
                }
              ]
        },
    },
};