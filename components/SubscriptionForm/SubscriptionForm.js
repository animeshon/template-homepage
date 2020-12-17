import React, { useState } from 'react';
import { withTranslation } from '@/root/i18n'

import classNames from 'classnames';

import styles from './SubscriptionForm.module.scss';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; // eslint-disable-line
export const validate = (string) => {
    if (!emailRegex.test(string)) {
        return false;
    }
    return true;
};

const SubscriptionForm = ({ t }) => {

    const [subscriptionState, setSubscriptionState] = useState({
    })

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
        <div className={styles['subscription-box']}>
            <div className={styles['from-header'], styles['mc-signup']} >
                <form onSubmit={e => handleSubmit(e)} id={'valueHeader'} >
                    <div className={styles['mc-signup-scroll']}>
                        <div className={styles["mc-field-group"]}>
                            <input
                                aria-label="email"
                                type="email"
                                placeholder={t('subscribeNewsLetterPlaceholder')}
                                onChange={e => handleTypeEmail(e)}
                                title={'valueHeader'}
                                className={classNames(
                                    "required",
                                    "email",
                                    subscriptionState.valueHeaderError ? ' error' : '',
                                    styles["mce-EMAIL"]
                                )}
                            />
                        </div>
                        <input
                            aria-label={t('subscribeNewsLetterAction')}
                            type="submit"
                            tabIndex="0"
                            value={t('subscribeNewsLetterAction')}
                            name="subscribe"
                            className={classNames("button", styles['mc-subscribe'])}
                        />
                    </div>
                </form>
            </div>
            {subscriptionState.error && (<p className={styles.error}>{subscriptionState.error}</p>)}
            {subscriptionState.success == true && (<p className={styles.success}>{t('subscribeNewsLetter_successfulStatus')}</p>)}
        </div>
    );
};


export default withTranslation('common')(SubscriptionForm);