import React from 'react';
import HomePage from './pages/homepage.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

import './App.css';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArry } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', collectionsArry.map(({title, items})=>({title, items})));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>
           this.props.currentUser ? (
             <Redirect to='/'/>
             ) : (
             <SignInAndSignUpPage/>
             )
           } 
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// });

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArry: selectCollectionsForPreview
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
