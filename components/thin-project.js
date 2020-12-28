import React from 'react'
import cn from 'classnames'
import * as styles from './thin-project.module.scss'
import { Link } from '@/root/i18n'
import Lottie from 'react-lottie';

const ThinProject = ({
  title,
  description,
  learn,
  href,
  visual
}) => {

  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: visual?.type == "lottie" ? visual.data : undefined,
    rendererSettings: {
      //hideOnTransparent:true,
      preserveAspectRatio: "YMidxMid meet"
    }
  }

  return (
    <div className={cn(styles.thin)}>
      <div className="container-fluid">
        <div className={cn('row middle-lg')}>
          <div className="col-lg-offset-1 col-lg-4 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
            <Link href={href} className={cn(styles.cap, 'secondary')}>
              <h3>{title}</h3>
            </Link>
            <p>{description}</p>
            <Link href={href} className={cn(styles.cap, 'secondary')}>
              {learn}
            </Link>
          </div>
          {visual &&
            <div className="col-lg-offset-2 col-lg-4 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
              {visual.type == "image" && <Link href={href}>
                <img loading="lazy" src={visual.data} alt={`${title} visualized`} />
              </Link>}
              {visual.type == "lottie" && <Link href={href}>
                <div style={{ maxHeight: "330px" }}>
                  <Lottie
                    options={lottieOption}
                    //width={200}
                    title={`${title} visualized`}
                  />
                </div>
              </Link>}
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ThinProject
