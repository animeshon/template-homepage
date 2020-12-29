import React, { ReactNode } from 'react'
import * as styles from './blog-section.module.scss'


const BlogSection = ({ children, overrideStyles }) => (
  <div className={styles.section} style={overrideStyles}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1  col-md-8 col-md-offset-2  col-lg-8 col-lg-offset-2">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default BlogSection
