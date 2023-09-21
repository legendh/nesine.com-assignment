import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../store/main-context";

import classes from "./Coupon.module.scss";

const Coupon = () => {
  const ctx = useContext(MainContext);
  const [total, setTotal] = useState(0);

  let totalValue = 1;
  useEffect(() => {
    setTotal(0);
    for (const key in ctx.matches) {
      if (ctx.matches.hasOwnProperty(key)) {
        const value = parseFloat(ctx.matches[key].value);
        if (!isNaN(value)) {
          totalValue *= value;
          setTotal(totalValue.toFixed(2));
        }
      }
    }
  }, [ctx.matches]);
  return (
    <div className={classes["coupon-main"]}>
      <ul className={classes["coupon-main__list"]}>
        {Object.keys(ctx.matches).map((key) => (
          <li key={key}>
            <span className={classes.mbs}>{ctx.matches[key].mbs}</span>
            <span className={classes["match-code"]}>
              Kod: {ctx.matches[key].matchCode}
            </span>
            <span className={classes.match}>
              Maç: {ctx.matches[key].teams}{" "}
            </span>
            <span className={classes.oran}>Oran: {ctx.matches[key].value}</span>
          </li>
        ))}
      </ul>
      <span className={classes["total-coupon-amount"]}>Toplam Tutar:</span>{" "}
      {total}
    </div>
  );
};

export default Coupon;
