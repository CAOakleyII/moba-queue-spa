import { Component } from 'react';
import QueueDialog from '../queue/QueueDialog.jsx';
import PartyDialog from '../party/PartyDialog.jsx';

export default class Home extends Component {
  onQueueClick(e){
    e.preventDefault();
    $('#queueDialog').openModal();
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
                        className="btn btn-floating waves-effect waves-light light-green accent-4"
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
        <div>
          <PartyDialog />
        </div>
      </div>
    )
  }
}
