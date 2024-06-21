import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";
const HistoryWindow = ({ history, toggle }) => {
  const [his, setHis]= useState(false);
  const handleClick=()=>{
    setHis(prevState => !prevState);
  }
  return (
    <div className={`historyWindow ${toggle}`}>
      <button style={{margin:"3px 3px" }} onClick={handleClick}><FaHistory size={24}/></button>
      <ul>
        {his && history.map((entry, index) => (
          <li style={{margin:"3px 2px"}} key={index}>
            {entry.expression} = {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryWindow;

