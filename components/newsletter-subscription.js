import React, { useState } from 'react'

import cn from 'classnames'
import * as styles from './newsletter-subscription.module.scss'
import { useTranslation } from 'next-i18next'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; // eslint-disable-line
export const validate = (string) => {
  if (!emailRegex.test(string)) {
    return false;
  }
  return true;
};

const NewsletterSubscription = ({ button, placeholder, className, inputClassName, buttonClassName, style }) => {
  const { t } = useTranslation('common');
  const [subscriptionState, setSubscriptionState] = useState({});
  const [email, setEmail] = useState("");

  const handleTypeEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.persist();
    setSubscriptionState({});

    const requestBody = {
      email: email,
      status: 'subscribed',
      language: 'en',
      //tags: [isoLang, machine],
      tags: [],
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (validate(email) === true) {
      fetch(
        'https://mailchimp-api.animeshon.com/api/v1/audience',
        options
      )
        .then(res => (res.status === 204 ? { code: 204 } : res.json()))
        .then(msg => {
          if (msg.code === 500) {
            setSubscriptionState({
              error: t('subscribeNewsLetter_internalServerError'),
              success: false,
            });
          } else if (msg.code === 400) {
            if (msg.error === 'email in compliance state') {
              requestBody.status = 'pending';

              fetch(
                'https://mailchimp-api.animeshon.com/api/v1/audience',
                {
                  method: 'POST',
                  body: JSON.stringify(requestBody),
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
                .then(res =>
                  res.status === 204 ? {} : res.json()
                )
                .then(msg => {
                  if (
                    msg.code === 400 &&
                    msg.error === 'invalid resource'
                  ) {
                    setSubscriptionState({
                      error: t('subscribeNewsLetter_invalidResource'),
                      success: false,
                    });
                  }
                })
                .catch(error => {
                  throw new Error(error);
                });
            } else if (
              msg.error === 'invalid resource' ||
              msg.error === 'forgotten email not subscribed'
            ) {
              setSubscriptionState({
                error: t('subscribeNewsLetter_invalidResource'),
              });
            } else if (msg.error === 'already subscribed') {
              setSubscriptionState({
                error: t('subscribeNewsLetter_alreadySubscribed'),
                success: false,
              });
            } else {
              setSubscriptionState({
                error: t('subscribeNewsLetter_badRequest'),
                success: false,
              });
            }
          } else if (msg.code === 204) {
            setSubscriptionState({
              error: '',
              success: true,
            });
          }
        })
        .catch(e => {
          setSubscriptionState({
            error: t('subscribeNewsLetter_badRequest'),
            success: false,
          });
          throw new Error(e);
        });
    } else if (!validate(email)) {
      setSubscriptionState({
        error: t('subscribeNewsLetter_invalidEmail'),
        success: false,
      })
    }
  };

  return (
    <div style={style} className={className}>
      <form className={styles.form}
        onSubmit={e => handleSubmit(e)}
      >
        <input
          className={inputClassName}
          type="email"
          name={'email'}
          placeholder={placeholder}
          required
          value={email}
          onChange={e => handleTypeEmail(e)}
        />
        <input
          className={buttonClassName}
          type="button"
          name={'submit'}
          value={button}
          onClick={e => handleSubmit(e)}
        />
      </form>
      {subscriptionState.error && (<p className={styles.error}>{subscriptionState.error}</p>)}
      {subscriptionState.success == true && (<p className={styles.success}>{t('subscribeNewsLetter_successfulStatus')}</p>)}
    </div>
  )
}

export default NewsletterSubscription;
