import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Perangkat from './Perangkat';
import LokasiPerangkat from './LokasiPerangkat';
import LokasiDatabase from './LokasiDatabase';
import Aplikasi from './Aplikasi';
import cookie from 'react-cookie';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    cookie.load('ncess') ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={()=>(<Home />)} />
          <Route path="/login" component={()=>(<Login/>)} />
          <PrivateRoute path="/perangkat" component={()=>(<Perangkat/>)} />
          <PrivateRoute path="/lokasiperangkat" component={()=>(<LokasiPerangkat/>)} />
          <PrivateRoute path="/lokasidatabase" component={()=>(<LokasiDatabase/>)} />
          <PrivateRoute path="/aplikasi" component={()=>(<Aplikasi/>)} />]
        </div>
      </Router>
    );
  }
}
export default App;
