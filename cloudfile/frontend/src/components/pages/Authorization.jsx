import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';


const Authorization = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const openRegister = () =>{
    navigate('/register')
  };
  const submit = async e => {
    e.preventDefault()

    const user = {
      username:username,
      password:password
    };

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,

};
try{
  const { data } = await axios.post('http://localhost:8000/api/auth/login', user, config);
  localStorage.clear();
  console.log(data)
  localStorage.setItem('access_token',data.token);
  localStorage.setItem('refresh_token',data.token);
  axios.defaults.headers.common['Authorization'] = `Token ${data['token']}`;
  navigate('/files')
} catch (error) {
  console.error('Authorization failed:', error.message);
  toast.error('Ошибка авторизации: "Введен неверный логин или пароль"');
}
  };
  
    return (
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="form-group row">
          <label for="inputUserName" className="col-sm-2 col-form-label">User Name</label>
          <div className="col-sm-10">
            <input type="text" value={username} className="form-control" id="inputUserName" onChange={e => setUsername(e.target.value)}></input>
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" value={password} required onChange={e => setPassword(e.target.value)}></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </div>
      </form>
      <div className="col-sm-10" onClick={openRegister}>
        <button className="btn btn-primary">Sign up</button>
      </div>
      <ToastContainer />
      </div>
    )
  };

export default Authorization