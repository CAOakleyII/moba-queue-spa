import { Component } from 'react';

export default class InQueueToast extends Component {
  componentDidMount(){
    $(".in-queue-toast").animate({height:'hide'}, 0);
  }
  onInQueueToastClick(e){
    $(".in-queue-toast").animate({height:'hide'}, 350);
    $('.queue-wait-trigger').click();
  }
  render(){
    return(
      <div className="inqueuetoast-div">
        <div className="in-queue-toast center-align" onClick={this.onInQueueToastClick.bind(this) }>
          <h5>In Queue <i className="fa fa-spin fa-1x fa-fw fa-circle-o-notch in-queue-spinner" aria-hidden="true"></i> </h5>
        </div>
      </div>
    )
  }
}
