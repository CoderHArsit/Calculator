import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

import ConfettiExplosion from 'react-confetti-explosion';
import confetti from 'canvas-confetti';
import HistoryWindow from "./HistoryWindow";
const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]); // State for history
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const [mode, setMode] = useState("rad");
  const [memory, setMemory] = useState(0); // Added state for memory

  const sciFunc = {
    sin: "sin",
    cos: "cos",
    tan: "tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
    "∛": "Math.cbrt",
    "x": "*",
    "x2": "**2",
    "x3": "**3",
    "xy": "**",
    "ex": "2.718281828459045**",
    "10X": "10**",
    "1/x": "1/",
    "2nd": "2**",
    "sinh": "Math.sinh",
    "cosh": "Math.cosh",
    "tanh": "Math.tanh",
    "Rand": "Math.random",
  };

  const toRadians = (angle) => (mode === "deg" ? (angle * Math.PI) / 180 : angle);

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let exp = expression;
         // Check for 5 and 6 as operands in the expression
         const containsFiveAndSix = /\b5\b/.test(exp) && /\b6\b/.test(exp);
         if (containsFiveAndSix) {
           confetti({
             particleCount: 1000,
             spread: 100,
             origin: { y: 0.6 }
           });
         }
        // Replace trigonometric functions with radian-adjusted versions
        exp = exp.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(${toRadians(angle)})`);
        exp = exp.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(${toRadians(angle)})`);
        exp = exp.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(${toRadians(angle)})`);

        let compute = eval(exp);
        setHistory([...history, { expression: displayEXP, result: compute }]); // Update history
        setExpression(compute);
        setDisplayEXP(compute);
        setResult(compute);

      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  function handleButton(value) {
    if (value === "c") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } else if (value === "x!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") calcResult();
    else if (value === "mode") {
      setMode(mode === "rad" ? "deg" : "rad");
    } else if (value === "MC") {
      setMemory(0);
    } else if (value === "M+") {
      setMemory(memory + parseFloat(result));
    } else if (value === "M-") {
      setMemory(memory - parseFloat(result));
    } else if (value === "MR") {
      setResult(memory.toString());
      setDisplayEXP(memory.toString());
      setExpression(memory.toString());
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  const [isExploding, setIsExploding] = React.useState(true);
  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
      <button onClick={() => handleButton("mode")}>Mode: {mode}</button>

      <button> DARK </button>
      <HistoryWindow history={history} /> 
    </div>
  );
};

export default Calculator;
