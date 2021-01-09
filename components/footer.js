import React from 'react'
import { withTranslation } from '@/root/i18n';

import cn from 'classnames'
import styles from './footer.module.scss'

import logo from '../public/brand/animeshon-brand-white.svg'

const Footer = ({menu, comp, t}) => (
  <footer className={cn(styles.footer)}>
    <div className="container-fluid">
      <div className="row">
        <div className={cn("col-lg-offset-1 col-lg-2 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 center-mobile", styles.logo)}>
          <img loading="lazy" src={logo} alt={'Animeshon logo'} />
          <p className={cn(styles.contact)}>
            {t("footerContactUs")}
            <br />
            <a href="mailto:hello@animeshon.com">hello@animeshon.com</a>
          </p>
          <p className={cn(styles.contact)}>{t("footerMotto")}</p>
          <br />
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
          <p className={styles.copyright}>{t("footerCopyrights")}</p>
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

export default withTranslation("common")(Footer);
