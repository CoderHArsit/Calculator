import React from "react";

const HistoryWindow = ({ history }) => {
  return (
    <div className="historyWindow">
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.expression} = {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryWindow;
