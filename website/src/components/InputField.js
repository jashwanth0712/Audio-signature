// inputField.js
import "../App.css"

export default function InputField() {
    const body = document.getElementById('root');
    const inputField = document.getElementById('yourInputFieldId');
  
    if (!inputField) {
      const newInputField = document.createElement('input');
      newInputField.id = 'yourInputFieldId';
      newInputField.placeholder = 'Ask AI';
      newInputField.setAttribute('type', 'text');
  
      body.appendChild(newInputField);
    }
  
    body.style.filter = 'blur(10px)';
  
    // You can define and reference 'listeningAnimation' here if needed.
    // listeningAnimation.style.display = 'block';
  
    inputField.style.display = 'block';
    inputField.focus();
  }
  