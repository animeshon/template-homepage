import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from '@/root/i18n';

import cn from 'classnames';
import * as styles from './user-search.module.scss';

import EncyclopediaTextSearch from './encyclopedia-text-search';
import { set } from 'numeral';

const UserSearch = ({t}) => {
  const [searchDisabled, searchSearchDisabled] = useState(true);
  const [text, setText] = useState("");
  const input = useRef(undefined);

  const validateSearch = (e) =>  {
    setText(e.target.value);
  }

  useEffect(() => {
    searchSearchDisabled(text == "");
  }, [text])

  useEffect(() => {
    input.current.focus();
  }, [])

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
          value={text}
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
