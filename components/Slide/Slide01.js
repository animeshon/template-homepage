import React from 'react';
// import Lottie from 'react-lottie';
import classNames from 'classnames';

import styles from './Slide01.module.scss';
import { withTranslation } from '@/root/i18n'

function Slide01({ t, strings, lang }) {
    const SubSlides = strings.subslides?.map(function (el) {
        const keyWords = el.keywords.map(function (keyWord) {
            return (<h4>{keyWord}</h4>)
        })
        return (
            <div className="subslide">
                <div className="keywords responsive--texts important-light">
                    {keyWords}
                </div>
                <div className="description responsive--texts light">
                    {el.description}
                </div>
            </div>
        )
    })

    // const lottieOption = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: require('../assets/lotties/lf20_lqsmgn.json'),
    //     rendererSettings: {
    //       //hideOnTransparent:true,
    //       preserveAspectRatio: "YMidxMid meet"
    //     }
    // }

    return (
        <div className="overview-feature smartphones-feature">
            {t('change-locale')}
            <div className="content">
                <h2 className={classNames("h2--komika", "important-light", { "italic": lang === 'ja' })}>{strings.headline}</h2>
                <div className="lottie">
                    {/* <Lottie  
                        options={lottieOption}
                        //title={title}
                        //width={200}
                    /> */}
                </div>
                <div className="subslides">
                    {SubSlides}
                </div>
            </div>
        </div>
    );
}

export default withTranslation('developer-page')(Slide01);
