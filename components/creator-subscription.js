import React from 'react'
import { withTranslation } from '@/root/i18n'

import * as styles from './creator-subscription.module.scss'

import NewsletterSubscription from '@/components/newsletter-subscription';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; // eslint-disable-line
export const validate = (string) => {
  if (!emailRegex.test(string)) {
    return false;
  }
  return true;
};

const CreatorSubsciprion = ({ t }) => {
  return (
    <NewsletterSubscription
      placeholder={t('subscribeNewsLetterPlaceholder')}
      button={t('subscribeNewsLetterAction')}
      className={styles.form}
      buttonClassName={styles['submit-button']}
      inputClassName={styles['input']}
    />
  )
}

export default withTranslation('common')(CreatorSubsciprion);;
