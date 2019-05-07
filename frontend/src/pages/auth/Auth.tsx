import React, { Component } from 'react';
import './Auth.css';

interface AuthProps {}

interface AuthState {
  email: string;
  password: string;
}

export default class Auth extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange = (e: any) : void => {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange = (e: any) : void => {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister = (e: any) => {
    e.preventDefault();
    
    const { email, password } = this.state

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const request = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            id
            email
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).catch(error => {
      console.log(error);
    })
  }

  handleSignin = (e: any) => {
    e.preventDefault();
    
    const { email, password } = this.state

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const request = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).catch(error => {
      console.log(error);
    })
  }
  
  render() {
    return (
      <div className="auth-page">
        <form className="auth-form" onSubmit={this.handleSignin}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={this.handleEmailChange} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handlePasswordChange} />
          </div>
          <div className="form-actions">
            <button type="button" onClick={this.handleRegister}>Register</button>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    )
  }
}
