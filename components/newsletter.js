import React from 'react';
import cn from 'classnames';
import * as styles from './newsletter.module.scss';
import VerticalDivider from './vertical-divider';
import NewsletterSubscription from './newsletter-subscription';

import { withTranslation } from '@/root/i18n'

const Newsletter = ({ t, title, description }) => {

  return (
    <div className={cn(styles.newsletter)}>
      <div className="container-fluid">
        <div className="row">
          <VerticalDivider padding={64} />
          <div className="col-lg-offset-1 col-lg-4  col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10">
            <>
              <h3>{title}</h3>
              <p>{description}</p>
            </>
          </div>
          <div
            className={cn(
              'col-lg-offset-2 col-lg-4  col-md-offset-1 col-sm-10  col-sm-offset-1 col-sm-10',
              styles.right
            )}
          >
            <h3>{t('subscribeNewsLetterTitle')}</h3>
            <NewsletterSubscription placeholder={t('subscribeNewsLetterPlaceholder')} button={t('subscribeNewsLetterAction')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('common')(Newsletter);
