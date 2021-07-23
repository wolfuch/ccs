import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { LoginScreen } from './components/LoginScreen'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={ LoginScreen }/>
            </Switch>
    </Router>
    )
}
