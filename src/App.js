import React, { Component } from 'react';
import './App.css';
import TacoForm from './TacoForm.js';

class App extends Component {
  state = { 
    tacos: [],
    currentlocation: 'Los Angeles',
  }

  componentDidMount() {
    this.getTacos();
  }

  getTacos = () => {
    fetch('https://showmetacos.herokuapp.com/api/tacos')
    .then(res => res.json())
    .then(tacos => this.setState({ tacos: tacos}));
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    // console.log('etargetval', e.target.value);
    this.setState(newState);
  }

  submitLocation = (e) => {
    e.preventDefault();
    console.log(e.target.text.value);
    const bodylocation = {location: e.target.text.value };
    console.log(JSON.stringify(bodylocation))
    this.setState({ currentlocation: e.target.text.value });
    fetch('https://showmetacos.herokuapp.com/api/tacosbytown', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodylocation)
    }).then(res => res.json())
    .then(tacos => this.setState({ tacos: tacos}));
  }

  render() {
    const { animals, tacos } = this.state;

    return (
      <div className="App flex-grid-thirds">
          <div className="colsm"></div>
          <div className="col">
            <h2 className="locationheader">TACOS IN {this.state.currentlocation}</h2>
            <TacoForm
              text={this.state.text}
              handleChangeText={this.onChangeText}
              submitLocation={this.submitLocation}
            />
            <ul className="tacos">
              {tacos.map((taco, index) =>
                <li key={index}>
                  <h1>{taco.name} | {taco.rating}</h1>
                  <h5>{taco.coordinates['latitude']}</h5>
                  <a href={taco.url} target="blank"><h5>{taco.location.display_address}</h5></a>
                  <a href={taco.url} target="blank"><img src={taco.image_url} width="100%"/></a>
                  <h5>...</h5>
                </li>
              )}
            </ul>
          </div>
          <div className="colsm"></div>
      </div>
    );
  }
}

export default App;