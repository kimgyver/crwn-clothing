import React from 'react';
import HomePage from './pages/homepage.component';
import {Route, Switch, Link} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import './App.css';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;
  
  componentDidMount() {
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
    //   this.setState({currentUser: user});
    //   console.log(user);
    // });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => { 
           // console.log(this.state);
          })

          console.log(this.state);
        });
      }

      this.setState({currentUser: userAuth});
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </div>
      );
    }
}

export default App;
