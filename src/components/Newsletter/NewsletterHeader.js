import React, { useContext } from "react";

import classes from "./Newsletter.module.scss";
import MainContext from "../../store/main-context";

const NewsletterHeader = () => {
    const ctx = useContext(MainContext);
  return (
    <thead>
      <tr
        className={`${classes["newsletter-table__row"]} ${classes["newsletter-table__title"]}`}
      >
        <th>Event Count: {ctx.eventCount}</th>
        <th>Yorumlar</th>
        <th></th>
        <th>1</th>
        <th>x</th>
        <th>2</th>
        <th>Alt</th>
        <th>Üst</th>
        <th>H1</th>
        <th>1</th>
        <th>x</th>
        <th>2</th>
        <th>H2</th>
        <th>1-X</th>
        <th>1-2</th>
        <th>X-2</th>
        <th>Var</th>
        <th>Yok</th>
        <th>+99</th>
      </tr>
    </thead>
  );
};

export default NewsletterHeader;
