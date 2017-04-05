import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import TambahUser from './TambahUser';
import UbahUser from './UbahUser';
import HapusUser from './HapusUser';
import Rest from 'fetch-on-rest';
import $ from 'jquery';
import {addOptions, service} from './config.js';

$.DataTable = require('datatables.net-bs');

class Home extends Component {
  constructor(){
    super();
    this.state={
      user:[]
    };
    this.api = new Rest (service,addOptions,false);
  }
  componentDidMount(){
    this.getDataUser();
  }
  getDataUser(){
    var self = this;
    this.api.get('user/all').then(
      (res) => {
        self.setState({
          user: res.data
        })
        $(self.refs.tableUser).DataTable();
      }
    )
  }
  renderUser(){
    var listUser = this.state.user.map((data, index) =>
      <tr key={index}>
        <td>{data.username}</td>
        <td>{data.role}</td>
        <td>{data.updated_at}</td>
        <td>
          <Route path="/" component={(match) => (<UbahUser user={data}/>)}/>
          <Route path="/" component={(match) => (<HapusUser user={data}/>)}/>
        </td>
      </tr>
    );
    return(
      <tbody>
        {listUser}
      </tbody>
    )
  }
  render(){
      return(
        <div>
          <Header />
          <Aside />
          <div className="content-wrapper">
            <section className="content-header">
              <h1 id="halimiliul">
                Halaman Utama
              </h1>
              <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-dashboard"></i> Halaman Utama</a></li>
              </ol>
            </section>
            <br />
            <section className="content">
              <div className="box">
                <div className="box-header">
                  <Route path="/" component={()=>(<TambahUser/>)} />
                </div>
                <div className="box-body">
                  <br />
                  <table ref="tableUser" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Waktu Terakhir Login</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {this.renderUser()}
                  </table>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      );
    }
  }
export default Home;
