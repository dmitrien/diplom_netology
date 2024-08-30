import React, {useState} from 'react'
import axios from 'axios'


const Authorization = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const submit = async e =>{
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

const { data } = await axios.post('http://localhost:8000/api/auth/login', user, config);
  localStorage.clear();
  console.log(data.access)
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  window.location.href = '/files'
  }
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
          <div className="col-sm-10">
            <button className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </form>
      </div>
    )
  }

export default Authorization