import { Component, PropTypes } from 'react';
class PartyDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      party: []
    };

    socket.on('party-found',this.onPartyFound.bind(this))
    socket.on('accepted-party', this.onUserAcceptedParty.bind(this));
  }
  onUserAcceptedParty(userIgn) {
    this.state.party.forEach((user) => {
      if (user.ign == userIgn) {
        user.hasAccepted = true;
      }
    });
    this.setState(this.state);

    if (this.state.party.every((user) => { return user.hasAccepted })) {
      $('#partyDialog').closeModal();
      this.context.router.push('/party');
    }
  }
  onAcceptPartyClick(e) {
    socket.emit('accept-party');
  }
  onPartyFound(data){
    this.state.party = data;
    this.setState(this.state);

    window.inQueue = false;
    $('#partyDialog').openModal({
      dismissible: false
    });
    $('#queueWaitDialog').closeModal();
    $(".in-queue-toast").animate({height:'hide'}, 350);
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
            ?
              user.hasAccepted ?
              <span className="user-accept-status">
                <i className="fa-check-square-o fa fa-3x fa-fw secondary-content light-green-text text-accent-4-"></i>
              </span>
              :
                <button onClick={this.onAcceptPartyClick.bind(this) } className="btn-floating btn-large waves-effect waves-light light-green accent-4 secondary-content" type="button">
                  <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                </button>
            :
            <span className="user-accept-status">
              <i className={ user.hasAccepted ? "fa-check-square-o fa-3x fa-fw fa secondary-content light-blue-text text-darken-3" : "fa-circle-o-notch fa-spin fa-3x fa-fw fa secondary-content light-blue-text text-darken-3"}></i>
            </span>
          }
      </li>
    )
  }
  render() {
    return(
      <div className="partydialog-div">
        <div className="popup">
          <div id="partyDialog" className="party-dialog modal">
           <div>
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
    )
  }
}

PartyDialog.contextTypes = {
  router: PropTypes.object.isRequired
};

export default PartyDialog;
