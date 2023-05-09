
import './App.css';
import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState(true);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(file);

  };

  const submitExcel = async (event) => {
    setDisplay(false);
    setMessage("Wait for few Minutes for confirmation!! Saving The Data");
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)

    await axios.post('http://localhost:5000/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log("Response from Client")
        console.log(response.data.message);
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err)
      })
    
  }

  return (
    <div className="App">
      {
        display && (<div> <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />
        <button onClick={submitExcel}>
          Submit
        </button></div>)
      }
      {
        message && (<div>{message}</div>)
      }
    </div>
  );
}

export default App;