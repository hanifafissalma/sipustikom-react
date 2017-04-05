import React,{Component} from 'react';
import {
  Redirect
} from 'react-router-dom';
import Rest from 'fetch-on-rest';
import cookie from 'react-cookie';
import {addOptions, service} from './config.js';

var serialize= require('form-serialize');

class Login extends Component{
  constructor(){
    super();
    this.state = {
      token: cookie.load('ncess')
    };

    this.api = new Rest(service);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var self = this;
    var str = serialize(e.target,{hash:true});
    this.api.post('login',str).then(
      (res)=>{
        cookie.save('ncess',res.token, {path: '/'});
        self.setState({
          token: cookie.load('ncess')
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }

  render(){

    if(this.state.token){
      return (
        <Redirect to={"/"}/>
      );
    }

    return(
      <div>
        <div style={{paddingTop:'75px', paddingLeft:'50px', paddingRight:'50px'}}>
          <h2 style={{textAlign:'center'}}><b>Sistem Pustikom</b></h2>
          <h2 style={{textAlign:'center'}}>Universitas Negeri Jakarta</h2>
        </div>
        <div className="login-box">
          <div className="login-box-body" style={{background:'#d2d6de'}}>
            <h3 style={{textAlign:'center'}}>Login</h3>
            <form id="form_login" onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <input type="text" className="form-control" placeholder="Username" name="username" />
                <span className="glyphicon glyphicon-user form-control-feedback"></span>
              </div>
              <div className="form-group has-feedback">
                <input type="password" className="form-control" name="password" placeholder="Password" />
                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div className="row">
                <div className="col-xs-8">
                </div>
                <div className="col-xs-4">
                  <button type="submit" form="form_login" className="btn btn-primary btn-block btn-flat">Masuk</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
