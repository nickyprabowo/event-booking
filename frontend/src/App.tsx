import React, { Component, Fragment } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// Component
import Navbar from "./components/navigation/Navbar";
import Auth from "./pages/auth/Auth";
import Event from "./pages/event/Event";
import Booking from "./pages/booking/Booking";
// Context
import { AuthContextInterface, ContextProvider } from "./context/auth-context";

class App extends Component {
  state = {
    token: "",
    userId: ""
  };

  login = (token: string, userId: string, tokenExpiration: number) => {
    this.setState({
      token,
      userId
    })
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  };

  render() {

    const appContext: AuthContextInterface = {
      token: this.state.token, 
      userId: this.state.userId, 
      login: this.login, 
      logout: this.logout
    };

    const { token } = this.state;

    return (
      <BrowserRouter>
        <Fragment>
          <ContextProvider value={appContext}>
            <Navbar />
            <main className="main-content">
              <Switch>
                {token && <Redirect from="/" to="/event" exact />}
                {token && <Redirect from="/auth" to="/event" exact />}
                {!token && <Route path="/auth" component={Auth} />}
                <Route path="/event" component={Event} />
                {token && <Route path="/booking" component={Booking} />}
                {!token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </ContextProvider>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
