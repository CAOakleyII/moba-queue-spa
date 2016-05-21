import { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import QueueWaitDialog from '../queue/QueueWaitDialog.jsx';
import InQueueToast from '../queue/InQueueToast.jsx';
import NavBar from './NavBar.jsx';

export default class App extends Component {
  constructor(props){
    super(props);
    window.socket = io(Meteor.settings.public.serverEngineUrl);
  }
  render(){
    return(
      <div className="app-div">

        <NavBar />
        
        <InQueueToast />

        { this.props.children }

        <QueueWaitDialog />

      </div>
    )
  }
}
