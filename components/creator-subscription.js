import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import * as styles from './creator-subscription.module.scss';

import NewsletterSubscription from '@/components/newsletter-subscription';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; // eslint-disable-line
export const validate = (string) => {
  if (!emailRegex.test(string)) {
    return false;
  }
  return true;
};

const CreatorSubsciprion = () => {
  const { t } = useTranslation('common');

  return (
    <>
    <img
        src={require("@/public/images/creators-cta.png")}
        alt="creators call to action"
        className={styles.image}
      />
    {/* <NewsletterSubscription
      placeholder={t('subscribeNewsLetterPlaceholder')}
      button={t('subscribeNewsLetterAction')}
      className={styles.form}
      buttonClassName={styles['submit-button']}
      inputClassName={styles['input']}
    /> */}
    </>
  )
}

export default CreatorSubsciprion;
