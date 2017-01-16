import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
    render() {
        return <div>
            <Link to={'/login'}>Login</Link>
            {this.props.children}
            <img src=".src/resources/images/compatible_with_strava.png"/>
        </div>
    }
}