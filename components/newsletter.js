import React, { useState } from 'react'
import cn from 'classnames'
import * as styles from './newsletter.module.scss'
import VerticalDivider from './vertical-divider'

import { withTranslation } from '@/root/i18n'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; // eslint-disable-line
export const validate = (string) => {
  if (!emailRegex.test(string)) {
    return false;
  }
  return true;
};

const Newsletter = ({ t, title, description }) => {
  const [subscriptionState, setSubscriptionState] = useState({
  });

  const handleTypeEmail = e => {
    setSubscriptionState({
      email: e.target.value,
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.persist();
    const requestBody = {
      email: subscriptionState.email,
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

    if (validate(subscriptionState.email) === true) {
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
        .catch(error => {
          setSubscriptionState({
            error: t('subscribeNewsLetter_badRequest'),
            success: false,
          });
          throw new Error(error);
        });
    } else if (!validate(subscriptionState.email)) {
      setSubscriptionState({
        error: t('subscribeNewsLetter_invalidEmail'),
        success: false,
      })
    }
  };

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
            <form className={styles.form}
              onSubmit={e => handleSubmit(e)}
            >
              <input
                type="email"
                name={'email'}
                placeholder={t('subscribeNewsLetterPlaceholder')}
                required
                onChange={e => handleTypeEmail(e)}
              />
              <input
                type="button"
                name={'submit'}
                value={t('subscribeNewsLetterAction')}
                onClick={e => handleSubmit(e)}
              />
            </form>
            {subscriptionState.error && (<p className={styles.error}>{subscriptionState.error}</p>)}
            {subscriptionState.success == true && (<p className={styles.success}>{t('subscribeNewsLetter_successfulStatus')}</p>)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default withTranslation('common')(Newsletter);
