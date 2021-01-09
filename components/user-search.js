import React, { useRef, useState } from 'react';
import { withTranslation } from '@/root/i18n';

import cn from 'classnames';
import * as styles from './user-search.module.scss';

import EncyclopediaTextSearch from './encyclopedia-text-search';

const UserSearch = ({t}) => {
  const [searchDisabled, searchSearchDisabled] = useState(true);
  const input = useRef(undefined);

  const validateSearch = (e) =>  {
    searchSearchDisabled(e.target.value == "");
  }

  return (
    <div className={styles["search-box"]}>
      <EncyclopediaTextSearch className={styles["internal-space"]} textRef={input}>
        <h1>
          <span>{t("brandAltText")}</span>
          <div className={styles.brand} />
        </h1>
        <input
          ref={input}
          type="text"
          placeholder={t("searchPlaceholder")}
          className={styles["search-field"]}
          onChange={validateSearch}
        />
        <input
          type="submit"
          value="Search"
          className={cn(styles.btn, styles["cyan-blue"], styles.big)}
          disabled={searchDisabled}
        />
      </EncyclopediaTextSearch>
    </div>
  )
}

export default withTranslation("common")(UserSearch);
