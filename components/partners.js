import React from 'react'
import styles from './partners.module.scss'

const adopters = [
  {
    title: 'Shoko Anime',
    featured: true,
    image: require('../public/images/partner-shoko.png'),
    url: 'https://shokoanime.com/'
  },
  {
    title: 'Visual-Novel Info',
    featured: true,
    image: require('../public/images/partner-visualnovel-info.png'),
    url: 'https://visual-novel.info/'
  },
]

const Partners = ({ onlyFeatured }) => (
  <div className={styles.adopters}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-offset-1 col-lg-10  col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10">
          <div className={styles.logos}>
            <div className={styles['logos-inner']}>
              {adopters
                .filter(({ featured }) => (onlyFeatured ? featured : true))
                .map(({ title, image, url }) => (
                  <a href={url} key={title}>
                    <img loading="lazy" src={image} alt={title} />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Partners
