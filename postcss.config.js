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
                    '--lg-strict-viewport': '(max-width: 1359px) and (min-width: 769px)',
                    '--xlg-viewport': '(min-width: 1360px)',
                    '--mobile-viewport': '(max-width: 768px)',
                    '--blog-viewport': '(max-width: 1500px)'
                  }
                }
              ]
        },
    },
};