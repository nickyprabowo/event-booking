import React, { Component } from "react";
import { AppContext } from "../../context/auth-context";
import { RouteComponentProps } from 'react-router-dom';
import './Auth.css';

interface AuthProps extends RouteComponentProps {

}

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

  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  handleEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) : void => {
    this.setState({
      email: e.currentTarget.value
    });
  }

  handlePasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) : void => {
    this.setState({
      password: e.currentTarget.value
    });
  }

  handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
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
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        if(this.context){
          this.context.login(
            resData.data.login.token, 
            resData.data.login.userId, 
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(error => {
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
