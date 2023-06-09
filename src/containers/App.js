import React, { Component, Fragment } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json() )
    .then(users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    //console.log(event.target.value);
    this.setState({searchField: event.target.value});
  }

  render() {
    const {robots, searchField} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return !robots.length ? 
    <h1 className='tc'>Loading!!!</h1> :
    (
        <Fragment>
          <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
              <CardList robots = {filteredRobots}/>
            </Scroll>
          </div>
        </Fragment>
    )
  }
}

export default App;
