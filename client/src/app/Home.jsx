import { Component } from 'react';
import QueueDialog from '../queue/QueueDialog.jsx';
import PartyDialog from '../party/PartyDialog.jsx';
import Population from '../population/Population.jsx';

export default class Home extends Component {
  componentDidMount(){
     $('.population-stats').animate({height:'toggle', width: 'toggle' }, 0);

     $('#btnQueueDialog').leanModal({
       complete: () => { $('#queueDialog').hide(); }
     });
  }
  onQueueClick(e){
    e.preventDefault();
  }
  onPopulationInfoClick(e){
    $('.population-stats').animate({height:'toggle', width: 'toggle' }, 350);
  }
  render() {
    return(
      <div className="home-div">
        <div className="vertical-align-container">
          <div className="vertical-align-content row">
            <div className="row taglines">
              <div className="col s10 offset-s2 tag-line"> Play Your Role. </div>
              <div className="col s9 offset-s3 head-line"> Play Smite. </div>
              <div className="col s7 offset-s5 queue-button-line">
                <button data-target="queueDialog"
                        id="btnQueueDialog"
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
              <div className="btn btn-floating waves-effect waves-light purple btn-population-info" onClick={this.onPopulationInfoClick.bind(this) }>
                <i className="material-icons">info_outline</i>
              </div>
              <div className="population-stats">
                <Population />
              </div>
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
