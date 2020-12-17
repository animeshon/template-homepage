import React from 'react';
import Header from '@/components/Header/Header'
import UserTypeButton from '@/components/UserTypeButton'

import { withTranslation } from '@/root/i18n'

const UserDispacher = ({t}) => {
  return (
    <div className="home">
      <Header />
      <div className="home-search-box">
        <div className="internal-space">
          <h1>
            <span>{t('aboutDispatcher_title')}</span>
          </h1>
          <h3>
            <span>{t('aboutDispatcher_subtitle')}</span>
          </h3>
          <div className="user-type-button-grid">
            <UserTypeButton type={"creator"} href={"/creator"}>
              <img src={"../svg/painter.svg"} />
              <span>{t('aboutDispatcher_choose_creator')}</span>
            </UserTypeButton>
            <UserTypeButton type={"user"} href={"/user"}>
              <img src={"../svg/open-book.svg"} />
              <span>{t('aboutDispatcher_choose_user')}</span>
            </UserTypeButton>
            <UserTypeButton type={"dev"} href={"/developer"}>
              <img src={"../svg/material-computer.svg"} />
              <span>{t('aboutDispatcher_choose_developer')}</span>
            </UserTypeButton>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

UserDispacher.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withTranslation('common')(UserDispacher);