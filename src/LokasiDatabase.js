import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import TambahLokasiDatabase from './TambahLokasiDatabase';
import UbahLokasiDatabase from './UbahLokasiDatabase';
import HapusLokasiDatabase from './HapusLokasiDatabase';
import Rest from 'fetch-on-rest';
import $ from 'jquery';
import {addOptions, service} from './config.js';

$.Datatable = require('datatables.net-bs');

class LokasiDatabase extends Component{
  constructor(){
    super();
    this.state={
      lokasiDatabase:[]
    }
    this.api=new Rest(service,addOptions,false);
  }
  componentDidMount(){
    this.getLokasiDatabase();
  }

  getLokasiDatabase(){
    var self=this;
    this.api.get('database/all').then(
      (res)=>{
        self.setState({
          lokasiDatabase:res.data
        })
        $(self.refs.tableLokasiDatabase).DataTable();
      }
    )
  }

  renderLokasiDatabase(){
    var listLokasiDatabase = this.state.lokasiDatabase.map((data,index)=>
      <tr key={index}>
        <td>{data.ip_address}</td>
        <td>{data.username}</td>
        <td>{data.password}</td>
        <td>{data.keterangan}</td>
        <td>
          <Route path="/" component={(match) => (<UbahLokasiDatabase lokasiDatabase={data}/>)}/>
          <Route path="/" component={(match) => (<HapusLokasiDatabase lokasiDatabase={data}/>)}/>
        </td>
      </tr>
    );
    return(
      <tbody>
        {listLokasiDatabase}
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
              Daftar Lokasi Database
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-desktop"></i> Manajemen Aplikasi</a></li>
              <li><a href="#" className="active"> Daftar Lokasi Database</a></li>
            </ol>
          </section>
          <br />
          <section className="content">
            <div className="box">
              <div className="box-header">
                <Route path="/" component={()=>(<TambahLokasiDatabase />)}></Route>
              </div>
              <div className="box-body">
                <br />
                <table ref="tableLokasiDatabase" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>IP Database</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  {this.renderLokasiDatabase()}
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
export default LokasiDatabase;
