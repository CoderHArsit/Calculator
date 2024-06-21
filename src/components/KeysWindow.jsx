import React from "react";
import { useState } from "react";
const KeysWindow = ({ handleButton },toggle) => {
  // const [showSciKeys,setShowSciKeys]=useState(false);

// Storin all the keys in different array for mapping in the grid
  const sciKeys = [
    "(",")","mc","m+","m-","mr","2nd","x2","x3","xy","ex","10X","1/x","√","∛","y√","ln","log10","x!","sin","cos","tan","e","EE","mode","sinh","cosh","tanh","π","Rand"  ];
  const basicKeys = [
       "c",
       "+/-",
       "%",
  ];
  const numKeys=[
  "7","8","9","4","5","6","1","2","3",
  "0",".","DEL"
  ];
 const operator=[
    '/',"x","-","+","="
 ];

  return (
    <div className={`keysWindow ${toggle}`}>
      {/* scientific keys section */}
      <div className="keys_scientific">
            {sciKeys.map((item, index) => (
              <button className="scibut" key={index} onClick={() => handleButton(item)}>
                {item}
              </button>
            ))}
      </div>
      {/* Basic and Numeric Key section */}
      <div className="keys">
        {basicKeys.map((item, index) => (
          <button className="scibut"
          onClick={() => handleButton(item)}
            key={index}
          >
            {item}
          </button>
        ))}
         {numKeys.map((item, index) => (
          <button 
            key={index}
            className="keybut"
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
         </div>
         {/* operator key secrtion */}
            <div className="opekey">
       { operator.map((item, index) => (
            <button 
              key={index}
              className="opbut
              "
              onClick={() => handleButton(item)}
            >
              {item}
            </button>
          ))
        }
        </div>
      </div>
    
  );
};

export default KeysWindow;
