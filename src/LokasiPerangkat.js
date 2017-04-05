import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import TambahLokasiPerangkat from './TambahLokasiPerangkat';
import UbahLokasiPerangkat from './UbahLokasiPerangkat';
import Rest from 'fetch-on-rest';
import $ from 'jquery';
import {addOptions, service} from './config.js';

$.Datatable = require('datatables.net-bs');
class LokasiPerangkat extends Component{
  constructor(){
    super();
    this.state={
      LokasiPerangkat:[]
    }
    this.api=new Rest(service,addOptions,false);
  }

  componentDidMount(){
    this.getLokasiPerangkat();
  }

  getLokasiPerangkat(){
    var self=this;
    this.api.get('references/location/all').then(
      (res)=>{
        self.setState({
          LokasiPerangkat:res.data
        })
        $(self.refs.tableLokasiPerangkat).DataTable();
      }
    )
  }
  renderLokasiPerangkat(){
    var listLokasiPerangkat = this.state.LokasiPerangkat.map((data,index)=>
      <tr key={index}>
        <td>{data.nama}</td>
        <td>{data.alamat}</td>
        <td>{data.telp}</td>
        <td></td>
        <td>
          <Route path="/" component={(match)=>(<UbahLokasiPerangkat LokasiPerangkat={data} /> )} />
        </td>
      </tr>
    );
    return(
      <tbody>
        {listLokasiPerangkat}
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
              Daftar Lokasi Perangkat
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-folder-open"></i> Manajemen Perangkat</a></li>
              <li><a href="#" className="active"> Daftar Lokasi Perangkat</a></li>
            </ol>
          </section>
          <br />
          <section className="content">
            <div className="box">
              <div className="box-header">
                <Route path="/" component={()=>(<TambahLokasiPerangkat />)} />
              </div>
              <div className="box-body">
                <br />
                <table ref="tableLokasiPerangkat" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Nama Lokasi</th>
                      <th>Alamat Lokasi</th>
                      <th>No. Telpon Lokasi</th>
                      <th>Jumlah Perangkat yang Ada</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  {this.renderLokasiPerangkat()}
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
export default LokasiPerangkat;
