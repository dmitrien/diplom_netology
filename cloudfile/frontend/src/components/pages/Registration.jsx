import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
    return regex.test(value) || "Только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов.";
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value) || "Не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ.";
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "Проверьте коректность email!";
  };

  const submit = async (register_data) => {
    console.log(register_data)
    const user = {
      username: register_data.username,
      email: register_data.email,
      firstname: register_data.firstname,
      lastname: register_data.lastname,
      password: register_data.password
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

const { data } = await axios.post('http://localhost:8000/api/auth/register', user, config);
  localStorage.clear();
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  window.location.href = '/'
};
    return (
      <div className="Register-form-container">
        <form className="Register-form" onSubmit={handleSubmit(submit)}>
        <div className="form-row">
            <div class="form-group col-md-6">
                <label for="inputUsername4">Username</label>
                <input type="text" className="form-control" id="inputUsername4" {...register("username", { required: "Поле обязательно для заполнения!", validate: validateUsername })}></input>{errors.username && <span className="error-validate-form">{errors.username.message}</span>}
            </div>
            <div className="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPassword4" {...register("password", { required: "Поле обязательно для заполнения!", validate: validatePassword })}></input>{errors.password && <span className="error-validate-form">{errors.password.message}</span>}
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4" {...register("email", { required: "Поле обязательно для заполнения!", validate: validateEmail })}></input>{errors.email && <span className="error-validate-form">{errors.password.email}</span>}
            </div>
        </div>
        <div className="form-group">
          <label for="inputFirstName" className="col-sm-2 col-form-label">First name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputFirstName" {...register("firstname", { required: false })}></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputLastName" className="col-sm-2 col-form-label">Last name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputLastName" {...register("lastname", { required: false })}></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </form>
      </div>
    )
  };

export default Registration