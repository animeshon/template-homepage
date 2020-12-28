import React from 'react'
import * as styles from './blog-summary-section.module.scss'
import cn from 'classnames'
import { Link } from '@/root/i18n'

const BlogSummarySection = () => {
  const posts = [{
    id: "test",
    frontmatter: {
      title: "Keeping Covid-19 in check with ORY Dockertest",
      teaser: "This article gives a short introduction to Dockertest and how Google is using it against Covid19, also an overview about the open-source virus response in general.",
      path: "/",
    },
  }];
  return (
    <div className={styles['blog-summary']}>
      <div className="container-fluid">
        <div className={cn('row middle-lg')}>
          <div
            className={cn(
              'col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10',
              styles.blogRow
            )}
          >
            {posts.map(
              ({
                id,
                frontmatter: { title, teaser, path }
              }) => (
                <Link key={id} href={path} >
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
