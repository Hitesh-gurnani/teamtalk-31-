import './App.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase';
import { setUser,clearUser } from './Store/Actions/authActions'
import { connect } from 'react-redux'
import { Spinner } from './Components/util/Spinner';
import alanBtn from '@alan-ai/alan-sdk-web';

const Panel=React.lazy(()=>import('./Containers/Panel/index'))
const Register=React.lazy(()=>import('./Containers/Auth/RegisterContainer'))
const Signin =React.lazy(()=>import('./Containers/Auth/SigninContainer'))
const alanKey = ''
class App extends Component {
  componentDidMount() {
    this.alanBtnInstance = alanBtn({ 
      key: 'b38b6095b505c8b6874a4285d1c330ca2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'go:back') {
          //call client code that will react to the received command
        }
      },
    });
    document.title="teamtalk"
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.userSet(user);
          this.props.history.push('/')
        } else {
          this.props.history.push('/signin')
          this.props.userClear();
        }
      })
  }
  render() {
    return this.props.isLoading?<Spinner/>: (
      <React.Suspense fallback={Spinner}>
        <Switch>
          <Route path='/' exact component={Panel} />
          <Route path='/signin' component={Signin} />
          <Route path='/register' component={Register} />
        </Switch>
      </React.Suspense>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isloading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSet: (user) => dispatch(setUser(user)),
    userClear: () => dispatch(clearUser())
  }
}
const With = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const Router = () => (<BrowserRouter>
  <With />
</BrowserRouter>)


export default Router;
