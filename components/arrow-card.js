import React from 'react'
import cn from 'classnames'
import * as styles from './arrow-card.module.scss'

import { Link } from '@/root/i18n'

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const ArrowCard = ({ href, left = false, fullpage, children }) => (
  <Link href={href} >
    <div className={cn(styles.arrow, left ? styles.left : styles.right, fullpage ? styles.rise : "")}>
      {left && <FaArrowLeft className={styles.icon} />}
      {children}
      {!left && <FaArrowRight size={"1em"} className={styles.icon} />}
    </div>
  </Link>
)

export default ArrowCard
