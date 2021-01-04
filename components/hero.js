import React from 'react'
import cn from 'classnames'
import * as styles from './hero.module.scss'


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

const Hero = ({ title, subtitle, cta, fullpage = false }) => (
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
    </div>
  </div>
)

export default Hero