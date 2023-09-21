import React from "react";

import "../assets/styles/normalize.scss";
import "./App.module.scss";

import Newsletter from "./Newsletter/Newsletter";
import Coupon from "./Coupon/Coupon";

const App = () => {
  return (
    <React.Fragment>
      <Newsletter />
      <Coupon />
    </React.Fragment>
  );
};

export default App;
