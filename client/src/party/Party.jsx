import { Component } from 'react';

export default class Party extends Component {
  constructor(props){
    super(props);

    this.state = {
      party: [],
      chat: []
    };
  }
  componentDidMount(){
    socket.emit('retrieve-party');
    socket.on('retrieve-party', this.onRetrieveParty.bind(this));
    socket.on('party-message', this.onReceivedMessage.bind(this));
    if (innerWidth > 600) {
      $('.chat').width(window.innerWidth  - 210);
    }
    window.onresize = function(){
      if (innerWidth > 600) {
        $('.chat').width(window.innerWidth  - 210);
      }
    };
    $('.mobile-party-list').animate({width:'8.333333%'}, 0);
    if ($('.lean-overlay')) {
      $('.lean-overlay').closeModal();
    }
  }
  onRetrieveParty(party){
    this.state.party = party;
    this.setState(this.state);
  }
  onSendMessage(e){
    e.preventDefault();
    var data = {};
    var inputs = [].slice.call(e.target.getElementsByTagName('input'));
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    $('#txtSendMessage').val("");
    socket.emit('party-message', data);
  }
  onReceivedMessage(message){
    this.state.chat.push(message);
    this.setState(this.state);
    $('.chat').scrollTop($('.chat')[0].scrollHeight);
  }
  btnSlideOpen(e){
    $('.mobile-party-list').animate({width:'60%'}, 350);
    $('.btn-slide-party-list').hide();
    $('.btn-slide-party-list-close').show();
    $('.party-members').show();
  }
  btnSlideClose(e){
    $('.mobile-party-list').animate({width:'8.333333%'}, 350);
    $('.btn-slide-party-list').show();
    $('.btn-slide-party-list-close').hide();
    $('.party-members').hide();
  }
  mapParty(user, index) {
    return(
      <div key={index} className="side-bar-user">
        <row className="row flex-col">
          <div className="col s1 flex-col">
            <img src={ user.avatarSrc } className="circle" />
          </div>
          <div className="col s10 offset-s1 flex-col">
            <span className="name"> { user.ign } </span>
          </div>
        </row>
      </div>
    )
  }
  mapChat(message, index){
    var userQueueData = JSON.parse(localStorage.getItem('queueData'));
    var isCurrentUser =  userQueueData.ign == message.user.ign;

    return (
      <div key={index}>
        <div className="chat-message">
          <span className={ isCurrentUser ? "current-user user-ign" : "user-ign" }> { message.user.ign } </span>
          <span className="user-message"> { message.text } </span>
        </div>
      </div>
    )
  }
  render() {
    return(
      <div className="party-div page">
        <div className="no-margin party-row row">
          <div className="hide-on-med-and-up party-list mobile-party-list">
            <div className="btn btn-floating waves-effect waves-light grey darken-3 btn-slide-party-list" onClick={this.btnSlideOpen.bind(this) }>
              <i className="fa fa-arrow-right arrow-icon" aria-hidden="true"></i>
            </div>
            <div className="btn btn-floating jquery-hide waves-effect waves-light grey darken-3 btn-slide-party-list-close" onClick={this.btnSlideClose.bind(this) }>
              <i className="fa fa-arrow-left arrow-icon" aria-hidden="true"></i>
            </div>
            <div className="jquery-hide party-members">
              { this.state.party.map(this.mapParty.bind(this)) }
            </div>
          </div>
          <div className="col m1 party-list desktop-party-list hide-on-small-only">
            <div className="party-header">
                <h5> Party </h5>
            </div>
            { this.state.party.map(this.mapParty.bind(this)) }
          </div>
          <div className="col m11 s11 offset-s1 chat-box">
            <div className="chat">
              { this.state.party.length == 0 ? <h5 className="center-align"> No Party <br /> Please Queue</h5>  : null  }
              { this.state.chat.map(this.mapChat.bind(this)) }
            </div>
            <div className="message">
              <form onSubmit={this.onSendMessage.bind(this)} >
                <input placeholder="Enter your message..." name="text" autoComplete="off" type="text" id="txtSendMessage" className="full-width" />
              </form>
            </div>


          </div>
        </div>
      </div>
    )
  }
}
