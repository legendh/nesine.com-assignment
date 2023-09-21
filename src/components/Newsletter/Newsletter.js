import React from "react";

import classes from "./Newsletter.module.scss";
import NewsletterHeader from "./NewsletterHeader";
import NewsletterMatch from "./NewsletterMatch";

const Newsletter = () => {

  return (
    <table className={classes["newsletter-table"]}>
      <NewsletterHeader />
      <NewsletterMatch />
    </table>
  );
};

export default Newsletter;
