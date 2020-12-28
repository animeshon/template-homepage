import React from 'react'
import styles from './vertical-divider.module.scss'

const VerticalDivider = ({ padding }) => (
  <div className={styles.divider} style={{ top: padding, bottom: padding }} />
)

export default VerticalDivider
