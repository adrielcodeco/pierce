import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Dashboard } from 'src/containers/dashboard'
import { Home } from 'src/containers/home'
import { Login } from 'src/containers/login'
import { ResetPwd } from 'src/containers/resetPwd'
import { Signup } from 'src/containers/signup'

export const Routes = () => (
  <Switch>
    <Route path='/' component={Home} exact />
    <Route path='/login' component={Login} exact />
    <Route path='/signup' component={Signup} exact />
    <Route path='/reset-pwd' component={ResetPwd} exact />
    <Route path='/dashboard' component={Dashboard} exact />
    <Redirect to='/' />
  </Switch>
)

export const Router = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)
