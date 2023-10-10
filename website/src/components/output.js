import React, { useEffect, useState } from 'react';

export default function Output(props) {
  const [emailList, setEmailList] = useState(''); // State to store the email input
  const [UrlLink, setUrlLink] = useState(''); // State to store the email input
  const [emails, setEmails] = useState([]); // State to store individual emails
  const [uploadedFile, setUploadedFile] = useState(null); // State to store the uploaded file
  const [fileInputText, setFileInputText] = useState('Choose a file'); // State to display the selected file name
  const [dataInsights, setdatainsights] = useState(null)
  const [filesList,setFilesList]=useState(null)
  const handleEmailListChange = (e) => {
    setEmailList(e.target.value);
    // Split the emailList string into an array of individual emails using spaces as the separator
    const emailArray = emailList.split(' ');

    // Trim whitespace from each email and remove empty entries
    const cleanedEmails = emailArray.map((email) => email.trim()).filter((email) => email !== '');

    // Update the emails state with the cleaned list of emails
    setEmails(cleanedEmails);

    // You can perform some action with the list of emails here, e.g., send them to a server
    console.log('Sending emails:', cleanedEmails);
  };
  useEffect(() => {
    // Check if filesList is null before updating it
    if (filesList === null) {
      // Delay the update after 10 seconds
      const timer = setTimeout(() => {
        setFilesList([
          {"jashwanth_resume.pdf": 1},
          {"piodanf.pdf": 1},
          {"bottleneck.pdf": 3},
          {"elonmuskhiring.pdf": 2},
          {"k.pdf": 1}
        ]);
        setdatainsights([{ "pending signature": 4 }, { "pending signature": 15 }, { "Draft": 4 }, { "Signed": 4 }])
      }, 10000);

      // Clear the timer if the component unmounts before it fires
      return () => clearTimeout(timer);
    }
  }, [filesList]);
  const handleUrlLinkChange = (e) => {
    setUrlLink(e.target.value);
    // Split the emailList string into an array of individual emails using spaces as the separator
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileInputText(file.name);
    }
  };

  const handleSendClick = () => {
    // You can access the uploaded file using the `uploadedFile` state here and perform actions with it.
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
{/* -------------File insight---------- */}
<div>
      {filesList && filesList.map((file, index) => (
        <div
          key={index}
          className="file-item inputfield"
          style={{
            display: "flex",
            justifyContent: "space-between",
            animationDelay: `${index * 0.1}s`, // Delay animation for each item
          }}
        >
          <span>{Object.keys(file)[0]}</span>
          {file[Object.keys(file)[0]] === 1 && <div className="dot green"></div>}
          {file[Object.keys(file)[0]] === 2 && <div className="dot orange"></div>}
          {file[Object.keys(file)[0]] === 3 && <div className="dot red"></div>}
        </div>
      ))}
      </div>
{/* -------------Data insight---------- */}
      {dataInsights && 
       <div>
       {dataInsights && (
         <div className="data-insights">
           {dataInsights.map((item, index) => (
             <div
               key={index}
               className="data-item button-39"
               style={{ width: "180px", animationDelay: `${index * 0.1}s` }}
             >
               <div className="data-key">{Object.keys(item)[0]}</div>
               <div className="data-value">{Object.values(item)[0]}</div>
             </div>
           ))}
         </div>
       )}
     </div>
      }
      {/* -------------Email---------- */}
      <div style={{ display: 'flex' }}>
        {emails && <p>Emails:</p>}
        <div style={{ width: '5px' }}></div>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
          {emails.map((email, index) => (
            <li key={index} style={{ marginRight: '10px', height: 'fit-content', marginBottom: '10px', background: '#E4F1FF', padding: '2px', borderRadius: '5px' }}>{email}</li>
          ))}
        </ul>
      </div>
      {/* -------------Url---------- */}
      <div style={{ display: 'flex' }}>
        {UrlLink && <p>File Url:</p>}
        <div style={{ width: '5px' }}></div>
        {UrlLink && (
          <p style={{ marginRight: '10px', height: 'fit-content', marginBottom: '10px', background: '#FFE7E7', padding: '2px', borderRadius: '5px' }}>{UrlLink}</p>
        )}
      </div>
      {/* -------------Email input---------- */}
      <form>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          Enter emails separated by spaces
          <input
            className='inputfield'
            type='text'
            value={emailList}
            onChange={handleEmailListChange}
            placeholder='Enter email addresses'
          />
        </div>
      </form>
      {/* -------------fileurl input---------- */}
      <form>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          Enter URL of the file
          <input
            className='inputfield'
            type='text'
            value={UrlLink}
            onChange={handleUrlLinkChange}
            placeholder='Enter File URL'
          />
        </div>
      </form>
      {/* ------------file input---------- */}
      <label for="images" class="drop-container" id="dropcontainer">
        <span class="drop-title">Drop files here</span>
        or
        <input type="file" id="images" accept="image/*" required></input>
      </label>
      
    </div>
  );
}
