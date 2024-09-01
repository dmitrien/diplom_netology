import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';

const Addfile = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [fileComment, setFileComment] = useState('');

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const formData = new FormData();
    formData.append('filename', fileName);
    formData.append('comment', fileComment);
    formData.append('file', file);
    const { response } = await axios.post('http://127.0.0.1:8000/api/file/upload/', formData, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data'

        },
        withCredentials: true,
        responseType: 'json'
    });
    console.log(response)
    toast.success('Файл успешно загружен!')
    
    } catch (error) {
        console.error('Upload failed:', error.message)
        toast.error('Ошибка загрузки файла: "Что то пошло не так, попробуйте позже"');
    };
    
  };
  

    return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileInput}
      />
      <br />
      <label>
        Название файла:
        <input
          type="text"
          value={fileName}
          readOnly
        />
      </label>
      <br />
      <label>
        Комментарий к файлу:
        <textarea
          value={fileComment}
          onChange={(e) => setFileComment(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Отправить файл</button>
    <ToastContainer />
    </form>
    
    );
};

export default Addfile;
