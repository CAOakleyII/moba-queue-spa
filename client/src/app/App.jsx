import { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class App extends Component {
  constructor(props){
    super(props);
    window.socket = io(Meteor.settings.serverEngineUrl);
  }
  onOpenNavMenu(e){
    $(".mobile-side-nav").animate({width:'toggle'}, 350);
  }
  componentDidMount(){
    $(".mobile-side-nav").animate({width:'toggle'}, 0);
  }
  render(){
    return(
      <div className="app-div">
        <div className="navbar-minimal row">
          <div className="navbar-minimal-col col s6 l3">
            <img className="logo" src="/images/logo-full.png" />
          </div>
          <div className="navbar-minimal-col col l9 right-align nav-bar-link-menu hide-on-med-and-down">
            <ul>
              <li className="nav-item"> LOGIN </li>
              <li className="nav-item"> PARTY </li>
            </ul>
          </div>
          <div  data-activates="mobile-side-nav" className="navbar-minimal-col col s6 nav-bar-link nav-bar-link-menu-mobile hide-on-large-only vertical-align-container justify-flex-end">
            <button className="vertical-align-content btn-floating btn waves-effect waves-light grey darken-3 btn-slide-mobile-nav" onClick={this.onOpenNavMenu.bind(this)}>
              <i className="material-icons">menu</i>
            </button>
          </div>
          <div id="mobile-side-nav" className="mobile-side-nav">
            <ul id="slide-out" className="side-nav-list">
              <li className="nav-item side-item"> Login </li>
              <li className="nav-item side-item"> Party </li>
            </ul>
          </div>

        </div>
        { this.props.children }
      </div>
    )
  }
}
