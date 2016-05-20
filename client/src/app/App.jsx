import { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    window.socket = io('http://localhost:6543');
  }
  render(){
    return(
      <div className="app-div">
        <div className="navbar-minimal row">
          <div className="navbar-minimal-col col s3">
            <img className="logo" src="/images/logo.png" />
          </div>
          <div className="navbar-minimal-col col s9 right-align nav-bar-link-menu">
            <ul>
              <li className="nav-item"> LOGIN </li>
              <li className="nav-item"> PARTY </li>
            </ul>
          </div>
        </div>
        { this.props.children }
      </div>
    )
  }
}
