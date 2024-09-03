import React from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';


const Authorization = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const openRegister = () =>{
    navigate('/register')
  };
const submit = async (data) => {

  const user = {
    username: data.username,
    password: data.password
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
      <form className="Auth-form" onSubmit={handleSubmit(submit)}>
        <div className="form-group row">
          <label for="inputUserName" className="col-sm-2 col-form-label">User Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputUserName" {...register("username", { required: true })}></input>{errors.username?.type === "required" && "Поле обязательно для заполнения!"}
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" {...register("password", { required: true })}></input>{errors.password?.type === "required" && "Поле обязательно для заполнения!"}
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