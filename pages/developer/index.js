import React, { StrictMode } from 'react';
import { withTranslation } from '@/root/i18n'

import Header from '@/components/Header/Header'
import Slide01 from '@/components/Slide/Slide01';
import Slide02 from '@/components/Slide/Slide02';
import Slide03 from '@/components/Slide/Slide03';
import Slide04 from '@/components/Slide/Slide04';
import SubscriptionForm from '@/components/SubscriptionForm/SubscriptionForm';

const Developer = ({dataLang}) => {
  return (
    <StrictMode>
      <Header />

      <SubscriptionForm/>

      <Slide01
        lang={"en"}
        strings={dataLang?.firstSlide || {}}
      />
      <Slide02
        lang={"en"}
        strings={dataLang?.userSlide || {}}
      />
      <Slide03
       lang={"en"}
        strings={dataLang?.devSlide || {}}
      />
      <Slide04
        lang={"en"}
        strings={dataLang?.contactsSlide || {}}
      />
      {/* <FAQ
        lang={"en"}
        strings={dataLang?.faq || {}}
        accordionSelection={accordionSelection}
        accordionOnClick={this.accordionOnClick}
      />
      <Footer /> */}
    </StrictMode>
  )
}

Developer.getInitialProps = async () => ({
  namespacesRequired: ['common', 'dev-page'],
})

export default withTranslation()(Developer);