import { Component } from 'react';
import { HTTP } from 'meteor/http';

export default class QueueDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      roles : ["ADC", "Support", "Mid", "Jungle", "Solo"]
    };
  }
  onQueueSubmit(e){
    e.preventDefault();

    // serialize form
    var data = {};
    var inputs = [].slice.call(e.target.getElementsByTagName('input'));
    inputs.forEach(input => {
      if (input.getAttribute('data-type') === "array") {
        if (!data[input.name]) {
          data[input.name] = [];
        }
        var role = {};
        if(input.checked) {
          data[input.name].push(input.value);
        }
      }
      else if (input.getAttribute('data-type') === "radio") {
        if(input.checked){
          data[input.name] = input.value;
        }
      }
      else {
        data[input.name] = input.value;
      }
    });

    // Send data to the server, set data in local storage.
    socket.emit('join-queue', data);
    window.inQueue = true;
    localStorage.setItem('queueData', JSON.stringify(data));

    // open wait dialog
    $('#queueWaitDialog').trigger('queue:start');
    $('.queue-wait-trigger').click();

  }
  mapRoles(role, index) {
    return (
      <p key={index}>
        <input id={role} name="roles" data-type="array" value={role} type="checkbox" />
        <label htmlFor={role}> {role} </label>
      </p>
    );
  }
  render() {

    return (
      <div className="queuedialog-div">
        <div id={this.props.elementId} className="modal bottom-sheet">
          <form action="#" onSubmit={this.onQueueSubmit.bind(this)}>
             <div className="modal-content">
               <div className="row">
                <div className="col s10 offset-s1 col m2 offset-m2">
                    <h5> Select Role(s) </h5>
                  { this.state.roles.map(this.mapRoles) }
                 </div>
                 <div className="col s10 offset-s1 col m2 offset-m1">
                    <h5> In Game Name </h5>
                    <p>
                      <input type="text" name="ign" id="txtIGN" placeholder="Cervial" />
                    </p>
                 </div>
                 <div className="col s10 offset-s1 col m2 offset-m1">
                    <h5> Game Mode </h5>
                    <p>
                      <input name="gamemode" type="radio" value="rankedConquest" data-type="radio" id="rankedConquest" defaultChecked="true" />
                      <label htmlFor="rankedConquest"> Ranked Conquest </label>
                    </p>
                    <p>
                      <input name="gamemode" type="radio" value="normalConquest" data-type="radio" id="normalConquest" />
                      <label htmlFor="normalConquest"> Normal Conquest </label>
                    </p>
                 </div>
               </div>
             </div>
             <div className="queue-dialog-footer center">
               <button type="submit" className="modal-action modal-close waves-effect btn waves-green btn-flat light-blue darken-3 white-text"> Submit </button>
             </div>
           </form>
        </div>
      </div>
    )
  }
}
