import React, { Component } from 'react'

export class Registration extends Component {
  render() {
    return (
        <form>
        <div className="form-row">
            <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4"></input>
            </div>
            <div className="col-sm-10">
                <label for="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPassword4"></input>
            </div>
        </div>
        <div className="form-group">
          <label for="inputUsername" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input type="username" className="form-control" id="inputUsername" placeholder="Addjast007"></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputFirstName" className="col-sm-2 col-form-label">First name</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputFirstName"></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputLastName" className="col-sm-2 col-form-label">Last name</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputLastName"></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Registration