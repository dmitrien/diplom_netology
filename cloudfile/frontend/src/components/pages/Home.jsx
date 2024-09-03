import React, { useState } from 'react';
import Header from '../layout/Header.jsx';
import Listfiles from '../forms/Listfiles.jsx';
import Addfile from '../forms/Addfile.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../style/Home.css'


function Home() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const [sharedLink, setSharedLink] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const navigate = useNavigate();

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

  const sharedFile = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/file/shared/${id}/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      setShowModal(true);
      setSharedLink(`${origin}/${response.data.link}`);
      console.log(response)
  };

  const renameFile = async(id) => {
    const newName = {filename: newFileName}
    const response = await axios.patch(`http://127.0.0.1:8000/api/file/shared/${id}/`, newName, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
  }

  const openModalRename = async(id) => {
    setShowModalRename(true)
    const response = await axios.get(`http://127.0.0.1:8000/api/files/${id}/`, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
    setNewFileName(response.data.filename)
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalRename(false)
    setSharedLink('');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sharedLink);
    closeModal();
    toast.success('Ссылка успешно скопирована в буфер обмена!')
  }

  const logOut = async e => {
    try {
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/logout`, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
    navigate('/')
   } catch (error) {
    console.error('Log out failed:', error.message);
    toast.error('Ошибка разлогина: "Попробуйте позже"');
   }
  }

  return (
        <>
        <Header logOut={logOut}/>
        <Listfiles files={files} setFiles={setFiles} onDelete={deleteFile} onDownload={sharedFile} onRename={openModalRename}/>
        <Addfile />
        {showModal && (
        <div className="modal shared-link">
          <h2>Ссылка для скачивания</h2>
          <p>{sharedLink}</p>
          <button onClick={copyLink}>Copy Link</button>
          <button onClick={closeModal}>OK</button>
        </div>
      )}
        {showModalRename && (
        <div className="modal rename-file">
          <h2>Введите новое название!</h2>
          <form className="rename-file-form" onSubmit={renameFile}>
            <input type="text" className="new-name-file" value={newFileName} onChange={(e) => setNewFileName(e.target.value)}></input>
            <button type='submit'>Переименовать</button>
          </form>
          <button onClick={closeModal}>Отмена</button>
        </div>
        )}
        <ToastContainer />
        </>
  );
}

export default Home;