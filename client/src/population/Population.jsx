import { Component } from 'react';

export default class Population extends Component {
  constructor(props){
    super(props);
    this.state = {
      queues: []
    };
    socket.on('queue-population', this.onQueuePopulation.bind(this));
  }
  onQueuePopulation(data){
    var queue = this.state.queues.find((x) => {
      if (x.id == data.id ) {
        $.extend(true, x, data);
        return x;
      }
    });
    if (!queue){
      this.state.queues.push(data);
    }

    this.setState(this.state);
  }
  mapQueuePopulations(queue, index){
    var styles = {
      width: `${queue.population}%`
    };

    var color = "";
    if(queue.population < 25){
      color = "red";
    } else if (queue.population < 50 ) {
      color = "yellow";
    } else {
      color = "green";
    }

    return(
      <div key={index} className="progress">
          <div className={`determinate progress-bar ${color}`} style={styles}></div>
      </div>
    )
  }
  render() {
    return(
      <div className="population-div">
        <div className="header center-align">
          Population
        </div>
        {this.state.queues.map(this.mapQueuePopulations.bind(this))}
      </div>
    )
  }
}
