import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listfiles({ onDownload, onDelete }) {
  const [files, setFiles] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [isSortedDesc, setIsSortedDesc] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/files', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      console.log(response)
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setIsSortedDesc(!isSortedDesc);
    } else {
      setSortColumn(column);
      setIsSortedDesc(true);
    }
  };

  const sortedFiles = [...files].sort((a, b) => {
    switch (sortColumn) {
      case 'filename':
        return isSortedDesc 
          ? a.filename.localeCompare(b.filename)
          : b.filename.localeCompare(a.filename);
      case 'size':
        return isSortedDesc 
          ? a.size - b.size
          : b.size - a.size;
      case 'uploaded':
        return isSortedDesc 
          ? new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime()
          : new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime();
      default:
        return 0;
    }
  });


    return (
      <div className="file-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('filename')}>Filename</th>
            <th onClick={() => handleSort('size')}>Size</th>
            <th onClick={() => handleSort('uploaded_at')}>Uploaded</th>
            <th onClick={() => handleSort('downloaded_at')}>Downloaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.filename}</td>
              <td>{file.size}</td>
              <td>{new Date(file.uploaded_at).toLocaleDateString()}</td>
              <td>{new Date(file.downloaded_at).toLocaleDateString()}</td>
              <td>
                <button className="delete-button" onClick={() => {onDelete(file.id) 
                  fetchFiles()}}>
                  Delete
                </button>
                <button className="Shared-button" onClick={() => onDownload(file.id)}>
                  Shared
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )

}

export default Listfiles
