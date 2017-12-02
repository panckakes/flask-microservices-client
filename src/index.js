import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import BluetoothList from './components/BluetoothList'
import NavioTemperature from './components/NavioTemperature'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      bluetooth: [],
      naviotemperature: [],
      username: '',
      email: ''
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { console.log(err); })
  }
  getBluetooth() {
    axios.get(`${process.env.REACT_APP_BLUETOOTH_SERVICE_URL}/bluetooth`)
    .then((res) => { this.setState({ bluetooth: res.data.data.bluetooth }); })
    .catch((err) => { console.log(err); })
  }
  getTemerature() {
    axios.get(`${process.env.REACT_APP_NAVIO_TEMPERATURE_SERVICE_URL}/api/v1/query?query=navio_barometer_temp`)
    .then((res) => { this.setState({naviotemperature: res.data.data.temperature }); })
    .catch((err) => { console.log(err); })
    // axios({
    //   method:'get',
    //   url:'127.0.0.1:9090/api/v1/query?query=navio_barometer_temp',
    //   responseType:'stream'
    // })
    // .then(function(response)) {
    //   response.data.pipe(fs.createWriteStream)
    // }
  }
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers();
      this.setState({ username: '' });
      this.setState({ email: '' });
    })
    .catch((err) => { console.log(err); })
  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br/>
            <h1>All Users</h1>
            <hr/><br/>
            <AddUser
              username={this.state.username}
              email={this.state.email}
              handleChange={ this.handleChange.bind(this) }
              addUser={ this.addUser.bind(this) }
            />
            <br/>
            <UsersList users={ this.state.users }/>
          </div>
          </div>
          <div className="col-md-6">
            <br/>
            <h1>Bluetooth Devices</h1>
            <hr/><br/>
            <BluetoothList bluetooth={ this.state.bluetooth }/>
          </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
