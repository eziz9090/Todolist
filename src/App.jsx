import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuLogo from './assets/menu.png'
import ArrowUp from './assets/keyboard_arrow_up.png'
import Plus from './assets/plus.png'
import Check from './assets/Check.png'
import Edit from './assets/Edit.png'
import { useLocalStorage } from 'usehooks-ts'

function App() {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false);
  var inputValue;
  
  //  tasks from localStorage or empty array
  const [tasks, setTasks] = useLocalStorage("tasksx", []);
  
  function getValue() {
    inputValue = document.getElementById("myInput").value;
  };
  
  function ListAdd(elementId) {
    const count2 = document.getElementsByClassName("grid").length;
    if (count2 < 6) {
      // Update tasks state and localStorage
      const newTasks = [...tasks, inputValue];
      setTasks(newTasks);
      
      // Create the task element using the shared function
      createTaskElement(inputValue, elementId);
      
      // Clear input after adding
      document.getElementById("myInput").value = "";
      
    } else {
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
  
  // Function to create a task element
  const createTaskElement = useCallback((taskText, parentId) => {
    const parent = document.getElementById(parentId);
    const newDiv = document.createElement("div");
    const ButtonBox = document.createElement("div");
    const newButton = document.createElement("img");
    const newButton2 = document.createElement("img");
    const Task = document.createElement("span");
    
    ButtonBox.className = "ButtonBox";
    newButton.src = Check;
    newButton.className = "buttons";
    newButton2.className = "buttons";
    newButton2.src = Edit;
    newDiv.className = "grid";
    Task.textContent = taskText;
    
    newDiv.appendChild(Task);
    
    ButtonBox.appendChild(newButton);
    ButtonBox.appendChild(newButton2);
    newDiv.appendChild(ButtonBox);
    parent.appendChild(newDiv); 
    
    newButton2.onclick = function() {
      const newText = prompt('Enter new text:', taskText);
      if (newText !== null && newText.trim() !== '') {
        Task.textContent = newText;
        // Update the task in localStorage
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = newText;
          setTasks(updatedTasks);
        }
      }
    };
    
    newButton.onclick = function() {
      newDiv.classList.toggle("checked");
      setTimeout(() => {
        newDiv.remove();
        // Remove task from localStorage when completed
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex !== -1) {
          const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
          setTasks(updatedTasks);
        }
      }, 2500);
    };
  }, [tasks, setTasks]);

  // Load existing tasks from localStorage 
  useEffect(() => {
    if (tasks.length > 0) {
     
      const listElement = document.getElementById('list');
      if (listElement) {
        const existingGrids = listElement.querySelectorAll('.grid');
        if (existingGrids.length === 0) {
          tasks.forEach(task => {
            createTaskElement(task, 'list');
          });
        }
      }
    }
  }, [tasks, createTaskElement]);
  
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
