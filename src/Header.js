import React, {Component} from 'react';
import {
  Redirect
} from 'react-router-dom';
import Rest from 'fetch-on-rest';
import cookie from 'react-cookie';

class Header extends Component{
  constructor(){
    super();
    this.state={
      token: cookie.load('ncess')
    };
    this.api = new Rest('https://localhost/sipustikom-service/public/api');
    this.logout = this.logout.bind(this);
  }
  logout(e){
    e.preventDefault();
    var self = this;
    cookie.remove('ncess', e.token,{path: '/login'});
    self.setState({
      token: false
    })
  }
  render(){
    if(!this.state.token){
      return (
        <Redirect to={"/login"}/>
      );
    }
    return(
      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <header className="main-header">
            <div className="logo" style={{backgroundColor:'#1b5e20'}}>
              <span className="logo-mini"><b>S</b>P</span>
              <span className="logo-lg"><b>Si</b>Pustikom</span>
            </div>
            <nav className="navbar navbar-static-top">
              <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span className="sr-only">Toggle navigation</span>
              </a>
              <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                  <li className="dropdown user user-menu">
                    <a href="#!" className="dropdown-toggle" data-toggle="dropdown" onClick={this.logout}>
                      <i className="fa fa-sign-out"></i>
                      <span className="hidden-xs">Keluar</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      </div>
    )
  }
}
export default Header;
