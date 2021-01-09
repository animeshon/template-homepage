import React, { useState, useEffect } from 'react'
import { withTranslation } from '@/root/i18n';

import cn from 'classnames'
import * as styles from './hero.module.scss'

import ArrowCard from './arrow-card';

import { ThemeLinks } from '@/root/config';


const CallToActionButton = ({
  title,
  href,
  className = 'secondary',
  openInNewWindow = false
}) => (
  <a
    key={title}
    href={href}
    className={cn(className, 'cta')}
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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Hero = ({ title, subtitle, overlay, cta, theme, fullpage = false, t, childrenClassName, children }) => {
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let inside = (
    <div className="col-sm-10 col-sm-offset-1  col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
      <h1>{title}</h1>
      <h2 className="col-lg-10 col-lg-offset-1">{subtitle}</h2>
      {cta && cta.map(CallToActionButton)}
    </div>
  )

  if (title == undefined && children) {
    inside = (
      <div className="col-sm-10 col-sm-offset-1  col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        {children}
      </div>
    )
  }

  if (title && children) {
    inside = (
      <>
        <div className={cn("col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-offset-1 col-lg-10 col-xlg-4", styles['hero-left-align'])}>
          <h1>{title}</h1>
          <h2 className={cn("col-lg-10", windowDimensions.width < 1360 ? "col-lg-offset-1" : undefined)}>{subtitle}</h2>
          {cta && cta.map(CallToActionButton)}
        </div>
        <div className={childrenClassName}>
          {children}
        </div>
      </>
    )
  }

  const stylingOverlay = {
    backgroundImage: `url('${overlay}')`,
  }

  return (
    <div className={cn(styles.hero, fullpage ? styles.full : undefined, styles[`hero-${theme}`])}>
      {overlay && (<div className={styles.overlay} style={stylingOverlay} />)}
      <div className="container-fluid">
        <div className="row">
          {inside}
        </div>

        <ArrowCard href={themeToArrow[theme].right.href} fullpage={fullpage} theme={theme}>
          {t(themeToArrow[theme].right.text)}
        </ArrowCard>
        <ArrowCard left={true} href={themeToArrow[theme].left.href} fullpage={fullpage} theme={theme}>
          {t(themeToArrow[theme].left.text)}
        </ArrowCard>
      </div>
    </div>
  )
}

export default withTranslation("common")(Hero);
