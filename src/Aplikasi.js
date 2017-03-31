import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import TambahAplikasi from './TambahAplikasi';
import UbahAplikasi from './UbahAplikasi';
import HapusAplikasi from './HapusAplikasi';
import Rest from 'fetch-on-rest';
import $ from 'jquery';
import {addOptions} from './config.js';

$.DataTable = require('datatables.net-bs');

class Aplikasi extends Component{
  constructor(){
    super();
    this.state={
      aplikasi:[]
    }
    this.api= new Rest('http://localhost/sipustikom-service/public/api',addOptions,false);
  }
  componentDidMount(){
    this.getDataAplikasi();
  }
  getDataAplikasi(){
    var self=this;
    this.api.get('application/all').then(
      (res)=>{
        self.setState({
          aplikasi:res.data
        })
        $(self.refs.TableAplikasi).DataTable();
      }
    )
  }

  renderAplikasi(){
    var listAplikasi= this.state.aplikasi.map((data,index)=>
      <tr key={index}>
        <td>{data.nama}</td>
        <td>{data.ip_lokal}</td>
        <td>{data.ip_public}</td>
        <td>{data.username}</td>
        <td>{data.password}</td>
        <td>
          <Route path="/" component={(match) => (<UbahAplikasi aplikasi={data} />)} />
          <Route path="/" component={(match) => (<HapusAplikasi aplikasi={data} />)} />
        </td>
      </tr>
    );
    return(
      <tbody>
        {listAplikasi}
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
            <h1>
              Daftar Aplikasi
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-desktop"></i> Manajemen Aplikasi</a></li>
              <li><a href="#" className="active"> Daftar Aplikasi</a></li>
            </ol>
          </section>
          <br />
          <section className="content">
            <div className="box">
              <div className="box-header">
                <Route path="/" component={()=>(<TambahAplikasi />)}></Route>
              </div>
              <div className="box-body">
                <br />
                <table ref="TableAplikasi" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Nama Aplikasi</th>
                      <th>IP Lokal</th>
                      <th>Ip Publik</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  {this.renderAplikasi()}
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
export default Aplikasi;
