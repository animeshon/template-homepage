import React from 'react'
import { withTranslation } from '@/root/i18n';

import cn from 'classnames'
import * as styles from './hero.module.scss'

import ArrowCard from './arrow-card';

import { ThemeLinks } from '@/root/config';


const CallToActionButton = ({
  title,
  href,
  style = 'secondary',
  openInNewWindow = false
}) => (
  <a
    key={title}
    href={href}
    className={cn(style, 'cta')}
    rel={openInNewWindow ? 'noopener noreferrer' : ''}
    target={openInNewWindow ? '_blank' : ''}
  >
    {title}
  </a>
)

const themeToArrow = {
  users: {
    left: {
      text: "arrowCreator",
      href: ThemeLinks.creators,
    },
    right: {
      text: "arrowDeveloper",
      href: ThemeLinks.developers,
    }
  },
  creators: {
    left: {
      text: "arrowDeveloper",
      href: ThemeLinks.developers,
    },
    right: {
      text: "arrowUser",
      href: ThemeLinks.users,
    }
  },
  developers: {
    left: {
      text: "arrowUser",
      href: ThemeLinks.users,
    },
    right: {
      text: "arrowCreator",
      href: ThemeLinks.creators,
    }
  },
}

const Hero = ({ title, subtitle, cta, theme, fullpage = false, t }) => (
  <div className={cn(styles.hero, fullpage ? styles.full : undefined)}>
    <div className={styles.overlay}>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1  col-md-10 col-md-offset-1  col-lg-10 col-lg-offset-1">
          <h1>{title}</h1>
          <h2 className="col-lg-10 col-lg-offset-1">{subtitle}</h2>
          <>{cta.map(CallToActionButton)}</>
        </div>
      </div>
      <ArrowCard href={themeToArrow[theme].right.href}>
        {t(themeToArrow[theme].right.text)}
      </ArrowCard>
      <ArrowCard left={true} href={themeToArrow[theme].left.href}>
        {t(themeToArrow[theme].left.text)}
      </ArrowCard>
    </div>
  </div>
)

export default withTranslation()(Hero);
