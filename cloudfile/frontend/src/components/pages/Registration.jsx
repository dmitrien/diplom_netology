import React, { Component, useState } from 'react'
import axios from 'axios'

const Registration = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [password,setPassword] = useState('');
  const submit = async e => {
    e.preventDefault()

    const user = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
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
        <form className="Register-form" onSubmit={submit}>
        <div className="form-row">
            <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" value={email} className="form-control" id="inputEmail4"  placeholder="test@test.ru" onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="col-sm-10">
                <label for="inputPassword4">Password</label>
                <input type="password" value={password} className="form-control" id="inputPassword4" onChange={e => setPassword(e.target.value)}></input>
            </div>
        </div>
        <div className="form-group">
          <label for="inputUsername" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input type="text" value={username} className="form-control" id="inputUsername" onChange={e => setUsername(e.target.value)}></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputFirstName" className="col-sm-2 col-form-label">First name</label>
          <div className="col-sm-10">
            <input type="text" value={firstname} className="form-control" id="inputFirstName" onChange={e => setFirstname(e.target.value)}></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputLastName" className="col-sm-2 col-form-label">Last name</label>
          <div className="col-sm-10">
            <input type="text" value={lastname} className="form-control" id="inputLastName" onChange={e => setLastname(e.target.value)}></input>
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