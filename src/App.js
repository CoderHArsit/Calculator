import React, { useState } from "react";
import Calculator from "./components/Calculator";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const App = () => {
  const [toggle,setToggle]=useState('dark');
  const [isDarkMode, setDarkMode] = React.useState(true);
  const handletog=(checked)=>{
    
    setToggle(toggle==='light'?'dark':'light');
    setDarkMode(checked);

  }
  return (
    <div className={`App ${toggle}`}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <h2>Confetti Calculator</h2> 
       <p>
       <DarkModeSwitch
       style={{marginBlock:"20px",marginLeft:"20px"}}
      checked={isDarkMode}
      onChange={handletog}
      size={30}
    />
       </p>
      </div>
      
      <Calculator toggle={toggle} />
      
    </div>
  );
};

export default App;