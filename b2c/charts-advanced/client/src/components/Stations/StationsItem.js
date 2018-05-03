import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import sum from 'lodash/sum';
import { fetchStation } from "../../actions/stations";
import StationError from './StationError';


@connect(null, { fetchStation })
export default class StationItem extends Component {
  interval = null;
  times = [100, 100];
  currentTime = 0;
  prevTime = 0;

  componentDidMount() {
    this.interval = setInterval(this.fetchData, 100);
    this.prevTime = this.props.parentTime;
  }



  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  componentDidUpdate() {
    this.prevTime = this.currentTime ? this.currentTime : 0;
    this.currentTime = this.props.time;
    const tempTime = (this.currentTime - this.prevTime) || 0;
    if (this.props.time && this.times.length > 20) {
      this.times.shift();
    }

    if(tempTime > 0 && tempTime <= 5000) {
      this.times.push(tempTime);
    }
  }

  fetchData = (timeout = 200) => {
    const { name, clientKey, time, parentTime } = this.props;

    if(!time) {
      this.props.fetchStation(clientKey, name, parentTime);
    } else {
      if(this.times.length > 0 && (Date.now() - time) > sum(this.times) / this.times.length) {
        this.props.fetchStation(clientKey, name, time || parentTime);
      }
    }
  };

  render() {
    const { name, points, enabled, error } = this.props;
    const status = enabled ? 'online' : 'offline';

    const chartData = {
      labels: new Array(100),
      datasets: [
        {
          label: name,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#FF7043',
          borderCapStyle: 'butt',
          borderWidth: .4,
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#AB47BC',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: '#AB47BC',
          pointHoverBorderColor: '#AB47BC',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          data: points
        }
      ]
    };

    const options = {
      animation: {
        duration: .1
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [ {
          gridLines: {
            color: 'rgba(103,58,183,.2)',
            lineWidth: 1,

          },
          ticks: {
            fontColor: "rgba(156,39,176,.5)",
            suggestedMin: -100,
            suggestedMax: 100
          }
        } ]
      }
    };

    return <div className="station">
      <div className="station-header">
        <h2>{name}</h2>
        <span className={status}>{status}</span>
      </div>
      <div className="station-body">
        {error && <StationError/>}
        <Line data={chartData} options={options} width={600} height={250}/>
      </div>
    </div>
  }
}