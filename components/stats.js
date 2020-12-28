import React, { Component } from 'react'

import styles from './stats.module.scss'
import AnimatedCounter from './animated-counter'

const Stats = ({header, stats}) => {
  return (
    <div className={styles.stats}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-1 col-lg-4  col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10">
            <h3>{header.title}</h3>
            <p>{header.description}</p>
          </div>
          <div className="mobile-offset-32 col-lg-offset-2 col-lg-4  col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10">
          <div className={styles.items}>
                {stats.map(({ title, amount, description }) => (
                  <div key={title} className={styles.item}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.amount}>
                      <AnimatedCounter countTo={amount} />
                    </div>
                    <div className={styles.description}>{description}</div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
