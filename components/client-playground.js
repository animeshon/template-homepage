import React from 'react'
import * as styles from './client-playground.module.scss'

const ClientPlayground = () => {
  return (
    <div className={styles['graphql-playground']}>
      <iframe src={"http://api.animeshon.com/graphql"} width={"100%"} height={"100%"} />
    </div>
  )
}

export default ClientPlayground
