import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import TambahPerangkat from './TambahPerangkat';
import UbahPerangkat from './UbahPerangkat';
import HapusPerangkat from './HapusPerangkat';
import LihatPerangkat from './LihatPerangkat';
import Rest from 'fetch-on-rest';
import $ from 'jquery';
import {addOptions} from './config.js';

$.Datatable = require('datatables.net-bs');

class Perangkat extends Component {
  constructor(){
    super();
    this.state={
      perangkat:[]
    };
    this.api=new Rest("http://localhost/sipustikom-service/public/api/device",addOptions,false);
  }
  componentDidMount(){
    this.getDataPerangkat();
  }
  getDataPerangkat(){
    var self= this;
    this.api.get('all').then(
      (res)=>{
        self.setState({
          perangkat:res.data
        })
        $(self.refs.tablePerangkat).DataTable();
      }
    )
  }
  renderPerangkat(){
    var listPerangkat = this.state.perangkat.map((data,index)=>
      <tr key={index}>
        <td>{data.nama}</td>
        <td>{data.ip_address}</td>
        <td>{data.lokasi.nama}</td>
        <td>{data.created_at}</td>
        <td>
          <Route path="/" component={(match) => (<LihatPerangkat perangkat={data}/>)}/>
          <Route path="/" component={(match) => (<UbahPerangkat perangkat={data}/>)}/>
          <Route path="/" component={(match) => (<HapusPerangkat perangkat={data}/>)}/>
        </td>
      </tr>
    );
    return(
      <tbody>
        {listPerangkat}
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
                Daftar Perangkat
              </h1>
              <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-folder-open"></i> Manajemen Perangkat</a></li>
                <li><a href="#" className="active"> Daftar Perangkat</a></li>
              </ol>
            </section>
            <br />
            <section className="content">
              <div className="box">
                <div className="box-header">
                  <Route path="/" component={()=>(<TambahPerangkat />)} />
                </div>
                <div className="box-body">
                  <br />
                  <table ref="tablePerangkat" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>IP Address</th>
                        <th>Lokasi</th>
                        <th>Dibuat Tanggal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {this.renderPerangkat()}
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
export default Perangkat;
