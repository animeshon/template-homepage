import React, { useEffect } from 'react'
import cn from 'classnames'
import * as styles from './client-playground.module.scss'

import { MiniGraphiQL } from 'mini-graphiql'
import 'mini-graphiql/dist/style.css'

import $ from 'jquery';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ClientPlayground = () => {
  useEffect(() => {
    $(".mini-graphiql-wrapper > div").css("height", "100%");
    $(".mini-graphiql-wrapper > div").css("background", "unset");
    $(".mini-graphiql-wrapper > div").css("border-radius", "unset");
    $(".mini-graphiql-wrapper > div").css("color", "white");

    function callback(mutationRecord) {
      for (let i = 0, len = mutationRecord.length; i < len; i += 1) {
        if ($(mutationRecord[i].target).hasClass("query-editor")) {
          $(".miniGraphiQL").css("height", "100%");
          $(".miniGraphiQL").css("box-shadow", "unset");
          $(".miniGraphiQL").css("border-radius", "unset");
          observer.disconnect();
          return;
        }
      }
    }

    const obsConfig = { 
      childList: true, 
      characterData: true, 
      attributes: true, 
      subtree: true,
    };
    const observer = new MutationObserver(callback);
    var targetNodes = $(".mini-graphiql-wrapper")[0];
    observer.observe(targetNodes, obsConfig);

    return () => {
      observer.disconnect();
    }
  }, []);

  const queries = [
    {q: "queryAnime", max: 23000},
    {q: "queryManga", max: 23000},
    {q: "queryVisualNovel", max: 25000},
    {q: "queryDoujinshi", max: 150000},
    {q: "queryLightNovel", max: 10000},
  ];

  const query = queries[Math.floor(Math.random() * queries.length)];
  const offset = getRandomInt(1, query.max);

  const queryConent = `
  {
      ${query.q}(first: 1, offset:${offset}) {
        names {
          hits {
            text
          }
        }
        aliases {
          hits {
            text
          }
        }
      }
  }`;

  return (
    <div className={cn(styles['graphql-playground'], "mini-graphiql-wrapper")}>
      {/* <iframe src={"https://api.animeshon.com/graphql"} width={"100%"} height={"100%"} /> */}
      <MiniGraphiQL url='https://api.animeshon.com/graphql' query={queryConent} />
    </div>
  )
}

export default ClientPlayground
