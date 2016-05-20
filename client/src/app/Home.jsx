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
  mapRoles(role, index){
    return(<span  className="party-role-item" key={index}> { role }  </span>)
  }
  mapPartyList(user, index) {
    var userQueueData = JSON.parse(localStorage.getItem('queueData'));
    var isCurrentUser =  userQueueData.ign == user.ign;
    return(
      <li key={index} className="partymember-div collection-item avatar">
        <img src={ user.avatarSrc } className="party-avatar-item circle" />
        <span className="title"> <b>{ user.ign }</b> </span>
        <p>
          <i>{ user.roles.map(this.mapRoles.bind(this)) }</i>
        </p>
        {
           isCurrentUser ?
            <div className="party-call-to-action center light-blue-text text-darken-3"> Press accept to join. </div> : ""
        }
        {  isCurrentUser
            ? <button className="btn-floating btn-large waves-effect waves-light light-green accent-4 secondary-content" type="button"> <i className="fa fa-check-circle-o" aria-hidden="true"></i> </button>
            : <span className="user-accept-status"> <i className="fa fa-cog fa-spin fa-3x fa-fw secondary-content light-blue-text text-darken-3"></i> </span>
          }
      </li>
    )
  }
  render() {
    return(
      <div className="home-div">
        <div className="shade hide-on-med-and-down">
        </div>
        <div className="vertical-align-container">
          <div className="vertical-align-content row">
            <div className="row taglines">
              <div className="col s10 offset-s2 tag-line"> Play Your Role. </div>
              <div className="col s9 offset-s3 head-line"> Play Smite. </div>
              <div className="col s7 offset-s5 queue-button-line">
                <button data-target="queueDialog"
                        className="btn btn-floating  modal-trigger waves-effect waves-light light-green accent-4"
                        type="submit"
                        onClick={this.onQueueClick}>
                  <i className="large material-icons">launch</i>
                </button>
              </div>
            </div>
            <div className="center home-divider">
            </div>
            <div className="after-break-content">
            </div>
          </div>
        </div>
        <div className="popup">
          <QueueDialog elementId="queueDialog" />
        </div>
        <div className="popup">
          <div className="party-dialog">
            <div id="partyDialog" className="modal">
             <div className="">

             <ul className="no-margin collection with-header">
                <li className="collection-header center">
                    <h5>Your Party</h5>
                 </li>
                { this.state.party.map(this.mapPartyList.bind(this))}
               </ul>
             </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
