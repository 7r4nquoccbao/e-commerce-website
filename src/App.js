import React, { Suspense, useEffect, useState } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {db, sighIn} from './app/firebase'

import './App.scss';

import NotFound from './components/NotFound';
import Header from './components/Header';
import TopMenu from './components/TopMenu';
import { useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import { getData } from './app/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Checkout from './features/Cart/pages/Checkout';

const Home = React.lazy(() => import('./features/Home'));
const Login = React.lazy(() => import('./features/Authentication/Login'))
const Register = React.lazy(() => import('./features/Authentication/Register'))
const Search = React.lazy(() => import('./features/Search'))
const Cart = React.lazy(() => import('./features/Cart'))


function App() {
  
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(false);

  useEffect(async () => {
      const actionResult = await dispatch(getData());
      const data = unwrapResult(actionResult);
      console.log(data);
  }, []);

  // useEffect(() => {
  //   sighIn('admin@gmail.com', 'admin@123');
  // }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route  path="/search" component={Search}/>
            <Route  path="/cart" component={Cart}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
