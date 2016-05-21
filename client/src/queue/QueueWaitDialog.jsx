import { Component } from 'react';

export default class QueueWaitDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      waitTime: 0,
      timeFormatted: "00:00",
      interval: undefined
    };
  }
  componentDidMount(){
    $('.queue-wait-trigger').leanModal({
      ready: this.onPopupOpen.bind(this),
      complete: this.onPopupClose.bind(this)
    });
    $('#queueWaitDialog').on('queue:start', this.onQueueStart.bind(this));
    $('#queueWaitDialog').on('queue:end', this.onQueueEnd.bind(this));
  }
  onPopupOpen(e){
    $(".in-queue-toast").animate({height:'hide'}, 350);
  }
  onPopupClose(e){
    if(window.inQueue) {
      $(".in-queue-toast").animate({height:'show'}, 350);
    }
  }
  onLeaveQueueClick(e) {
    socket.emit('leave-queue');
    window.inQueue = false;
  }
  onQueueEnd(e){

  }
  onQueueStart(e){
    this.resetTimer();
    this.state.interval = setInterval(this.queueTimer.bind(this), 1000);
    this.setState(this.state);
  }
  resetTimer(e) {
    this.state.waitTime = 0;
    this.state.timeFormatted = "00:00";
    if (this.state.interval) {
      window.clearInterval(this.state.interval);
    }
    this.setState(this.state);
  }
  queueTimer() {
    var state = this.state;
    var time = state.waitTime;
    var minutes = Math.floor( time / 60);
    var seconds = time - minutes * 60;
    state.waitTime++;
    state.timeFormatted =
      (minutes > 9 ? minutes :  "0"+minutes) +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
    this.setState(state);
  }
  render() {
    return(
      <div className="queuewaitdialog-div">
        <button className="queue-wait-trigger" data-target="queueWaitDialog"></button>
        <div id="queueWaitDialog" className="modal modal-fixed-footer queue-wait-dialog">
          <div className="modal-content center-align">
            <h4>In Queue</h4>
            <p>{ this.state.timeFormatted }</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect btn waves-green btn-flat red darken-3 white-text" onClick={ this.onLeaveQueueClick.bind(this) }>Leave</a>
          </div>
        </div>
      </div>
    )
  }

}
