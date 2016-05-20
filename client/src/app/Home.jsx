import { Component } from 'react';
import QueueDialog from '../queue/QueueDialog.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      party: []
    };

    socket.on('PartyFound',this.onPartyFound.bind(this))
  }
  onPartyFound(data){
    var state = this.state;
    state.party = data;
    this.setState(state);
    $('#partyDialog').openModal();
  }
  onQueueClick(e){
    e.preventDefault();
    $('#queueDialog').openModal();
  }
  mapPartyList(index, user) {
    var userQueueData = localStorage.getItem('queueData');
    return(
      <div key={index} className="partymember-div">
        <div>
          <div className="col s8 offset-s1">
            <p>
              <b> { user.ign } </b>
            </p>
            <p>
              <i>{ user.roles }</i>
            </p>
          </div>
          <div className="col s2">
            { userQueueData.ign == user.ign
                ? <button className="btn btn-flat light-green accent-4" type="button"> Y </button>
                : <span className="user-accept-status"> X </span>
              }
          </div>
        </div>
      </div>
    )
  }
  render() {
    return(
      <div className="home-div">
        <div className="vertical-align-container">
          <div className="vertical-align-content row">
            <div className="center">
                <button data-target="queueDialog" onClick={this.onQueueClick} className="btn modal-trigger waves-effect waves-light light-green accent-4" type="submit">
                Queue
                </button>
            </div>
          </div>
        </div>
        <div className="popup">
          <QueueDialog elementId="queueDialog" />
        </div>
        <div className="party-dialog">
          <div id="partyDialog" class="modal">
           <div class="modal-content">
             <h5>Your Party</h5>
             { this.state.party.map(this.mapPartyList.bind(this))}
           </div>
           <div class="modal-footer">
             <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Accept</a>
           </div>
          </div>
        </div>
      </div>
    )
  }
}
