import React from 'react'
import cn from 'classnames'
import styles from './footer.module.scss'

import logo from '../public/brand/animeshon-brand-white.svg'

const Footer = ({menu, comp}) => (
  <footer className={cn(styles.footer)}>
    <div className="container-fluid">
      <div className="row">
        <div className={cn("col-lg-offset-1 col-lg-2 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile", styles.logo)}>
          <img loading="lazy" src={logo} alt={'Animeshon logo'} />
          <p className={cn(styles.contact)}>
            Get in touch with us
            <br />
            <a href="mailto:office@ory.sh">office@animeson.sh</a>
          </p>
          <br />
          <p className={cn(styles.contact)}>Made with ❤️ by Animeshon</p>
        </div>
        <div className="col-lg-7 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile mobile-offset-64">
          <div className={cn('row', styles['menu-row'])}>
            {menu.map(({ title, items }) => (
              <div key={title} className={styles['menu-item']}>
                <p className={styles['list-title']}>{title}</p>
                <ul className={styles.list}>
                  {items.map(({ title, href }) => (
                    <li key={title} className={styles.item}>
                      <a href={href}>{title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className={cn(
            'col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile',
            styles.divider
          )}
        />
      </div>

      <div className="row">
        <div className="col-lg-offset-1 col-lg-3 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile">
          <p className={styles.copyright}>&copy; Copyright 2020 Animeshon S.R.L</p>
        </div>

        <div className="col-lg-6 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile">
          <div className={cn('row', styles['comp-row'])}>
            {comp.map(({ items }, index) => (
              <div key={index} className={styles['menu-item']}>
                <ul className={styles.list}>
                  {items.map(({ title, href }) => (
                    <li key={title} className={styles['comp-item']}>
                      <a href={href}>{title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer