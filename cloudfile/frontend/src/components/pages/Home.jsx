import React, { useState } from 'react';
import Header from '../layout/Header.jsx';
import Listfiles from '../forms/Listfiles.jsx';
import Addfile from '../forms/Addfile.jsx';
import axios from 'axios';


function Home() {
  const [files, setFiles] = useState([]);

  const deleteFile = async (id) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/files/${id}/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      console.log(response)
  };
  const downloadFile = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/file/shared/${id}/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      console.log(response)
  };

  return (
        <>
        <Header />
        <Listfiles files={files} setFiles={setFiles} onDelete={deleteFile} onDownload={downloadFile} />
        <Addfile />
        </>
  );
}

export default Home;