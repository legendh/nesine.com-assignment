import React, { useState, useEffect } from "react";

const MainContext = React.createContext({
  eventCount: 0,
  data: {},
  matches:{},
  getTotalVal: () => {},
  addMatchToCoupon : () =>{}
});

export const MainContextProvider = (props) => {
  const [eventCount, setEventCount] = useState(0);
  const [rawData, setRawData] = useState({});
  const [data, setData] = useState({});
  const [isPageEnd, setIsPageEnd] = useState(false);
  const [dataSlice, setDataSlice] = useState(100);
  const [matches, setMatches] = useState({});

  const addMatchToCoupon = (matchesData) =>{
    setMatches(matchesData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://nesine-case-study.onrender.com/bets");
        const data = await response.json();
        setEventCount(data.length);
        setRawData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      const newData = rawData.slice(0, dataSlice);
      setData(newData);
    }
  }, [rawData, dataSlice]);

  const checkIfEndOfPage = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (Math.ceil(scrollPosition) + windowHeight >= documentHeight) {
      setIsPageEnd(true);
    } else {
      setIsPageEnd(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkIfEndOfPage);
    return () => {
      window.removeEventListener("scroll", checkIfEndOfPage);
    };
  }, []);

  useEffect(() => {
    isPageEnd && eventCount >= dataSlice && setDataSlice(dataSlice + 100);
  }, [isPageEnd]);

  return (
    <MainContext.Provider
      value={{
        eventCount: eventCount,
        data: data,
        addMatchToCoupon: addMatchToCoupon,
        matches : matches
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
