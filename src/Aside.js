import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Rest from 'fetch-on-rest';
import {addOptions} from './config.js';

class Aside extends Component{
  constructor(){
    super();
    this.api= new Rest('http://localhost/sipustikom-service/public/api',addOptions,false);
    this.getUser();
    this.state={
      user:{}
    }
  }
  getUser(){
    // var self = this;
    this.api.get('whoami').then(
      (res)=>{
        this.setState({
          user:res
        })
      }
    )
  }
  renderMenuJaringan(){
    if(this.state.user.role ==="net" || this.state.user.role === "super"){
      return(
        <li className="treeview">
          <a href="#">
            <i className="fa fa-folder-open"></i> <span>Manajemen Perangkat</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><Link to="/perangkat"><i className="fa fa-circle-o"></i> Daftar Perangkat</Link></li>
            <li><Link to="/lokasiperangkat"><i className="fa fa-circle-o"></i> Daftar Lokasi Perangkat</Link></li>
          </ul>
        </li>
      )
    }
  }
  renderMenuAplikasi(){
    if(this.state.user.role ==="app" || this.state.user.role === "super"){
      return(
        <li className="treeview">
          <a href="#">
            <i className="fa fa-desktop"></i> <span>Manajemen Aplikasi</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><Link to="/lokasidatabase" ><i className="fa fa-circle-o"></i> Daftar Lokasi Database</Link></li>
            <li><Link to="/aplikasi"><i className="fa fa-circle-o"></i> Daftar Aplikasi</Link></li>
          </ul>
        </li>
      )
    }
  }
  render(){
    return(
      <div>
        <div className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src="images/default-profile.png" className="img-circle" alt="User" />
              </div>
              <div className="pull-left info">
                <p>{this.state.user.username}</p>
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <Link to="/">
                  <i className="fa fa-dashboard"></i> <span>Halaman Utama</span>
                </Link>
              </li>
            {this.renderMenuJaringan()}
            {this.renderMenuAplikasi()}
            </ul>
          </section>
        </div>
      </div>
    )
  }
}

export default Aside;
