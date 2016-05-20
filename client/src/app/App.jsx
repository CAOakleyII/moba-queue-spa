import { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    window.socket = io('http://localhost:6543');
  }
  render(){
    return(
      <div className="app-div">
        { this.props.children }
      </div>
    )
  }
}
