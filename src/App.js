import React from 'react';
import HomePage from './pages/homepage.component'
import {Route, Switch, Link} from 'react-router-dom'

import './App.css';


const HomePage2 = props => {
  console.log(props);
  return (
    <div>
      <button onClick={() => props.history.push('/blog/topics')}>Topics </button>
      <h1>HOME PAGE</h1>
    </div>
  );
};

const HatsPage = () => (
  <div>
      <h1>Hats Page</h1>
  </div>
)

const TopicsList = props => {
  console.log(props);
  return (
    <div>
      <h1>TOPIC LIST PAGE</h1>
      <Link to={`${props.match.url}/13`}>TO TOPIC 13</Link><br/>
      <Link to={`${props.match.url}/17`}>TO TOPIC 17</Link><br/>
      <Link to={`${props.match.url}/21`}>TO TOPIC 21</Link><br/>
    </div>
  );
};

const TopicDetail = props => {
  console.log(props);
  return (
    <div>
      <h1>TOPIC DETAIL PAGE: {props.match.params.topicId}</h1>
    </div>
  );
};

function App() {
  return (
    <div>
       <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop/hats' component={HatsPage} />
          <Route exact path='/blog/asdqw/topics' component={TopicsList} />
          <Route path='/blog/aaaaa/topics/:topicId' component={TopicDetail} />
          <Route exact path='/blog/topics' component={TopicsList} />
          <Route path='/blog/topics/:topicId' component={TopicDetail} />
       </Switch>
    </div>
  );
}

export default App;
