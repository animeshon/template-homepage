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
  {
    title: 'KaDoKo',
    featured: true,
    image: require('../public/images/partner-kadoko.png'),
    url: 'https://github.com/skyborgff/KaDoKo'
  },
  {
    title: 'NOI',
    featured: true,
    image: require('../public/images/partner-noi.png'),
    url: 'https://noi.bz.it'
  },
  {
    title: 'Free University of Bolzano',
    featured: true,
    image: require('../public/images/partner-lub.png'),
    url: 'https://www.unibz.it'
  },
  // {
  //   title: 'Enterprise Europe Network',
  //   featured: true,
  //   image: require('../public/images/partner-een.png'),
  //   url: 'https://een.ec.europa.eu/'
  // },
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
                  <a href={url} key={title} target="_blank">
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
