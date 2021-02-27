import React from 'react'
import { useRouter } from 'next/router'
import * as styles from './blog-summary-section.module.scss'
import cn from 'classnames'
import Link from 'next/link'

const BlogSummarySection = ({ posts }) => {
  return (
    <div className={styles['blog-summary']}>
      <div className="container-fluid">
        <div className={cn('row middle-lg')}>
          <div
            className={cn(
              'col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10',
              styles['blog-row']
            )}
          >
            {posts.slice(0, 3).map(
              ({ title, teaser, path }) => (
                <Link key={path} href={path} locale={useRouter().locale}>
                  <div className={cn(styles['blog-box'])}>
                    <h3 className={cn('col-lg-offset-1 col-lg-10')}>{title}</h3>
                    <p className={cn('col-lg-offset-1 col-lg-10', 'secondary')}>
                      {teaser}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSummarySection
