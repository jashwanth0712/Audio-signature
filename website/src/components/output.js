import React, { useState } from 'react';

export default function Output(props) {
  const [emailList, setEmailList] = useState(''); // State to store the email input
  const [emails, setEmails] = useState([]); // State to store individual emails

  const handleEmailListChange = (e) => {
    setEmailList(e.target.value); 
     // Split the emailList string into an array of individual emails using spaces as the separator
     const emailArray = emailList.split(' ');
    
     // Trim whitespace from each email and remove empty entries
     const cleanedEmails = emailArray.map(email => email.trim()).filter(email => email !== '');
 
     // Update the emails state with the cleaned list of emails
     setEmails(cleanedEmails);
 
     // You can perform some action with the list of emails here, e.g., send them to a server
     console.log('Sending emails:', cleanedEmails);// Update the emailList state as the user types
  };

  const handleSendClick = () => {
   
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={emailList}
          onChange={handleEmailListChange}
          placeholder="Enter email addresses"
        />
         <input
          type="text"
          value={emailList}
          onChange={handleEmailListChange}
          placeholder="Enter email addresses"
        />
        <button type="button" onClick={handleSendClick}>
          Send
        </button>
      </form>
      <div>
  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
    {emails.map((email, index) => (
      <li key={index} style={{ marginRight: '10px',height:"fit-content", marginBottom: '10px' , background:"#E4F1FF" ,padding:"2px" , borderRadius:"5px"}}>{email}</li>
    ))}
  </ul>
</div>

      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
