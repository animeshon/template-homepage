import React, { useEffect } from 'react'

import Router from 'next/router';
import { EncyclopediaSearchHref } from '@/root/config';

const EncyclopediaTextSearch = ({ textRef, children, className }) => {
  const handleQuerySubmit = e => {
    e.preventDefault();
    if (textRef.current.value != '') {
      Router.push({
        pathname: EncyclopediaSearchHref,
        query: { q: textRef.current.value },
      });
    }
  };

  return (
    <form onSubmit={handleQuerySubmit} className={className}>
      {children}
    </form>
  );
}

export default EncyclopediaTextSearch;
