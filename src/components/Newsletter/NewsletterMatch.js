import React, { useReducer, useEffect, useContext } from "react";

import classes from "./Newsletter.module.scss";
import MainContext from "../../store/main-context";

const initialSelectedState = {};

const selectedReducer = (state, action) => {
  const id = action.idNumber;
  if (state.hasOwnProperty(id) && state[id].type === action.type) {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }
  return {
    ...state,
    [id]: { type: action.type, value: action.value, teams: action.teams, mbs: action.mbs, matchCode: action.matchCode, isActive: true },
  };
};

const NewsletterMatch = () => {
  const [selectedState, dispatchSelected] = useReducer(
    selectedReducer,
    initialSelectedState
  );

  const handleClick = (event, matchType, id, teams, mbs, matchCode) => {
    dispatchSelected({
      type: matchType,
      value: event.target.innerText,
      idNumber: id,
      teams: teams,
      mbs: mbs,
      matchCode: matchCode
    });
  };

  const ctx = useContext(MainContext);

  useEffect(()=>{
    ctx.addMatchToCoupon(selectedState)
  },[selectedState])
  return (
    <tbody>
      {ctx.data.length === undefined && (
        <tr>
          <td className={classes["loading-text"]} colSpan="20">
            Maçlar yükleniyor lütfen bekleyiniz...
          </td>
        </tr>
      )}
      {ctx.data.length > 0 &&
        ctx.data.map((item) => {
          const {
            NID: key,
            D: date,
            DAY: day,
            LN: league,
            C: matchCode,
            T: time,
            N: teams,
            OCG: {
              1: {
                MBS: mbs,
                OC: {
                  1: { O: zero },
                },
              },
              2: {
                OC: {
                  3: { O: oneZero },
                  4: { O: oneTwo },
                  5: { O: zeroTwo },
                },
              },
              5: {
                OC: {
                  26: { N: overTitle },
                },
              },
            },
          } = item;

          const isMatchActive = (matchType) => {
            return selectedState[key]
              ? selectedState[key].isActive &&
                  selectedState[key].type === matchType
              : false;
          };
          
          return (
            <React.Fragment key={key}>
              <tr
                className={`${classes["newsletter-table__row"]} ${classes["newsletter-table__row-date-league-type"]}`}
              >
                <td>{`${date} ${day} ${league}`}</td>
                <td>Yorumlar</td>
                <td> </td>
                <td>1</td>
                <td>x</td>
                <td>2</td>
                <td>Alt</td>
                <td>{overTitle}</td>
                <td>H1</td>
                <td>1</td>
                <td>x</td>
                <td>2</td>
                <td>H2</td>
                <td>1-X</td>
                <td>1-2</td>
                <td>X-2</td>
                <td>Var</td>
                <td>Yok</td>
                <td>+99</td>
              </tr>
              <tr
                className={`${classes["newsletter-table__row"]} ${classes["newsletter-table__row-match-info"]}`}
              >
                <td>
                  <span className={classes["match-code"]}>{matchCode}</span>{" "}
                  <span>{time}</span> <span>{teams}</span>
                </td>
                <td>Yorumlar</td>
                <td>{mbs}</td>
                <td></td>
                <td
                  id={key + "zero"}
                  className={isMatchActive("zero") ? classes.active : ""}
                  onClick={(event) => handleClick(event, "zero", key, teams, mbs,matchCode)}
                >
                  {zero}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  id={key + "oneZero"}
                  className={isMatchActive("oneZero") ? classes.active : ""}
                  onClick={(event) => handleClick(event, "oneZero", key, teams, mbs,matchCode)}
                >
                  {oneZero}
                </td>
                <td
                  id={key + "oneTwo"}
                  className={isMatchActive("oneTwo") ? classes.active : ""}
                  onClick={(event) => handleClick(event, "oneTwo", key, teams, mbs,matchCode)}
                >
                  {oneTwo}
                </td>
                <td
                  id={key + "zeroTwo"}
                  className={isMatchActive("zeroTwo") ? classes.active : ""}
                  onClick={(event) => handleClick(event, "zeroTwo", key, teams, mbs,matchCode)}
                >
                  {zeroTwo}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </React.Fragment>
          );
        })}
    </tbody>
  );
};

export default NewsletterMatch;
