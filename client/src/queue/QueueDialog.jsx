import { Component } from 'react';
import { HTTP } from 'meteor/http';
import Form from '../components/Form.jsx';

export default class QueueDialog extends Form {
  constructor(props){
    super(props);
    this.state = {
      roles : ["ADC", "Support", "Mid", "Jungle", "Solo"],
      platforms: ["PC", "Xbox", "PS4"],
      regions: ["NA", "EU", "AUS"],
      selectedPlatform: "PC"
    };
  }
  componentDidMount(){
    $(`.platform-option.platform-${this.state.selectedPlatform}`).addClass('selected');
  }
  onQueueSubmit(e){
    e.preventDefault();

    // remove validation errors
    $('#roleRequired').hide();

    // check for validity
    if(!e.target.checkValidity()) {
      return;
    }

    var data = this.serialize(e.target);

    if (data.roles.length <= 0) {
      $('#roleRequired').show();
      return;
    }

    if(!this.state.selectedRegion && this.state.selectedPlatform == "PC") {
      data.region = "NA";
    }

    // Send data to the server, set data in local storage.
    socket.emit('join-queue', data);
    window.inQueue = true;
    localStorage.setItem('queueData', JSON.stringify(data));

    $(`#${this.props.elementId}`).closeModal();

    // open wait dialog
    $('#queueWaitDialog').trigger('queue:start');
    $('.queue-wait-trigger').click();

    $(`#${this.props.elementId}`).hide();
  }
  onPlatformSelect(platform){
    var selected = $('.platform-option.selected')
     if (selected) {
       $(selected).removeClass('selected');
     }
     $(`.platform-option.platform-${platform}`).addClass('selected');

     this.state.selectedPlatform = platform;
     this.setState(this.state);

  }
  onRegionSelect(region) {
    this.state.selectedRegion = region;
    this.setState(this.state);
  }
  mapRoles(role, index) {
    return (
      <p key={index} className="role col s4 offset-s5">
        <input id={role} name="roles" data-type="array" value={role} type="checkbox" />
        <label htmlFor={role}> {role} </label>
      </p>
    );
  }
  mapPlatforms(platform, index) {
    var icon = " ";
    switch(platform){
      case "PC":
        icon += "ion-social-windows";
        break;
      case "Xbox":
        icon += "ion-xbox";
        break;
      case "PS4":
        icon += "ion-playstation";
        break;
    }

    return  (
      <div key={index} className={`col s4 center-align waves-effect waves-light platform-option platform-${platform}`} onClick={this.onPlatformSelect.bind(this, platform)}>
        <i className={"platform-icon icon" + icon}></i>
      </div>
    )
  }
  mapRegions(region, index) {
    return (
      <li key={index} className="region-item"><a className={`btn-floating region-option region-${region} center-align`} onClick={this.onRegionSelect.bind(this, region)}>{region}</a></li>
    )
  }
  render() {

    return (
      <div className="queuedialog-div">
        <div id={this.props.elementId} className="modal bottom-sheet">
          <form action="#" onSubmit={this.onQueueSubmit.bind(this)}>
          <input type="hidden" name="platform" value={this.state.selectedPlatform} />
          <input type="hidden" name="region" value={this.state.selectedRegion} />
             <div className="modal-content">
               <div className="row platforms-row">
                  { this.state.platforms.map(this.mapPlatforms.bind(this)) }
               </div>
               <div className="row">
                <div className="col s10 offset-s1 col m4 center-align">
                    <h5> Select Role(s) </h5>
                    <div className="row">
                      <div className="col s4 offset-s4 jquery-hide" id="roleRequired">
                        <span className="red-text">Role required.</span>
                      </div>
                      { this.state.roles.map(this.mapRoles) }
                    </div>
                 </div>
                 <div className="col s10 offset-s1 col m4 center-align">
                    <h5> In Game Name </h5>
                    <p>
                      <input type="text" className="validate" name="ign" id="txtIGN" placeholder="Cervial" required />
                       <label for="txtIGN" data-error="Valid in game name required."></label>
                    </p>
                 </div>
                 <div className="col s10 offset-s1 col m4 center-align">
                    <h5> Game Mode </h5>
                    <p className="center-align">
                      <input name="gamemode" type="radio" value="normalConquest" data-type="radio" id="normalConquest" defaultChecked="true"/>
                      <label htmlFor="normalConquest"> Normal Conquest </label>
                    </p>
                    <p className="center-align">
                      <input name="gamemode" type="radio" value="rankedConquest" data-type="radio" id="rankedConquest" disabled />
                      <label htmlFor="rankedConquest"  data-position="bottom" className="tooltipped" data-delay="50" data-tooltip="Ranked Temporarily Disabled." > Ranked Conquest </label>
                    </p>
                 </div>
               </div>
             </div>
             <div className="queue-dialog-footer center">
             {
               this.state.selectedPlatform == "PC" ?
               <div className="fixed-action-btn horizontal">

                    { !this.state.selectedRegion ?
                      <a className="btn-floating btn red" data-error="Please select a region">
                        <i className="fa fa-globe" aria-hidden="true"></i>
                      </a> :
                      <a className={`btn-floating btn center-align region-${this.state.selectedRegion}`}> { this.state.selectedRegion } </a>
                    }
                  <ul className="region-options">
                    { this.state.regions.map(this.mapRegions.bind(this)) }
                  </ul>
                </div>
                : null
                }
               <button type="submit" className="modal-action waves-effect btn waves-green btn-flat light-blue darken-3 white-text"> Submit </button>
             </div>
           </form>
        </div>
      </div>
    )
  }
}
