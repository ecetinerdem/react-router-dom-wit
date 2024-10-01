import './App.css';
import { Route, Switch } from 'react-router-dom';
import Product from './components/Product';
import AboutUs from './components/AboutUs';
import { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <p>Main Page</p>
        </Route>
        <Route path="/product/:id/:name">
          <Product />
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/register">
          <Register setUser={setUser} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
