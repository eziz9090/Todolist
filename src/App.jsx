import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuLogo from './assets/menu.png'
import ArrowUp from './assets/keyboard_arrow_up.png'
import Plus from './assets/plus.png'
import Check from './assets/Check.png'
import Edit from './assets/Edit.png'
function App() {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false);
  var inputValue;
  
  
  function getValue() {
     inputValue = document.getElementById("myInput").value;
     
  };
  
  function ListAdd(elementId) {
    
    const count2 = document.getElementsByClassName("grid").length;
    if (count2<6) {
    const parent = document.getElementById(elementId);
    const newDiv = document.createElement("div");
    const ButtonBox = document.createElement("div");
    const newButton = document.createElement("img");
    const newButton2 = document.createElement("img");
    const Task =  document.createElement("span");
    
    ButtonBox.className = "ButtonBox";
    newButton.src = Check;
    newButton.className = "buttons";
    newButton2.className = "buttons";
    newButton2.src = Edit;
    newDiv.className = "grid";
    newDiv.appendChild(Task);
    Task.textContent = inputValue;
    ButtonBox.appendChild(newButton);
    ButtonBox.appendChild(newButton2);
    newDiv.appendChild(ButtonBox);
    parent.appendChild(newDiv); 
    newButton2.onclick = function() {
      Task.textContent = prompt('Enter ');
    };
    newButton.onclick = function() {
      newDiv.classList.toggle("checked");
      setTimeout(() => {
        newDiv.remove()
      }, 2500);
   
    };

    }else{
      const parent2 = document.getElementById("Panel");
      const newDiv2 = document.createElement("span");
      newDiv2.className = "Warning";
      newDiv2.textContent = "You have too many tasks right now.";
      parent2.appendChild(newDiv2);
      setTimeout(() => {
        parent2.removeChild(newDiv2);
        
      }, 1500);
    
      
    };
    
  };
  
  return (
    <>
      <div className='BoxHorizontal' id='Panel'>
        
      </div>
      
      
      <div className={isActive ? "BoxVertical" : "BoxVerticalz"} onClick={() => setIsActive(!isActive)} >
        
        {isActive ? <img src={MenuLogo} className='menu'/> : <img src={ArrowUp} className='menu down'/>}
        
      </div>
      <div className='MainBox' id='list'> 
        <div className='Panel' >     <input type="text" id="myInput" placeholder="Enter text here">
        </input> <span className='IconsPanel'><img className='Icon' src={Plus} onClick={() => { getValue();ListAdd('list')}}/></span></div>
        
      </div>
    </>
  )
}

export default App
