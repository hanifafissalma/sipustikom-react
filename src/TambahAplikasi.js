import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import Rest from 'fetch-on-rest';
import {addOptions} from './config.js';
var serialize = require('form-serialize');

class TambahAplikasi extends Component{
  constructor() {
    super();
    this.state = {
      modalFormAplikasi: false,
      jenisAplikasi:[],
      lokasiDatabase:[]
    };
    this.api = new Rest('http://localhost/sipustikom-service/public/api',addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.getJenisAplikasi();
    this.getLokasiDatabase();
  }
  getJenisAplikasi(){
    var self=this;
    this.api.get('references/application/all').then(
      (res)=>{
        self.setState({
          jenisAplikasi:res.data
        })
      }
    )
  }

  getLokasiDatabase(){
    var self=this;
    this.api.get('database/all').then(
      (res)=>{
        self.setState({
          lokasiDatabase:res.data
        })
      }
    )
  }

  renderJenisAplikasi(){
    var listJenisAplikasi = this.state.jenisAplikasi.map((data,index)=>
      <option key={index} value={data.id}>{data.nama}</option>
    );
    return(
      <FormControl componentClass="select" name="jenis_aplikasi">
        <option value="">--Pilih Jenis Aplikasi--</option>
        {listJenisAplikasi}
      </FormControl>
    )
  }
  renderLokasiDatabase(){
    var listLokasiDatabase = this.state.lokasiDatabase.map((data,index)=>
      <option key={index} value={data.id}>{data.ip_address}</option>
    );
    return(
      <FormControl componentClass="select" name="db">
        <option value="">--Pilih Lokasi Database--</option>
        {listLokasiDatabase}
      </FormControl>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    var str= serialize(e.target,{hash:true});
    this.api.post('application/save',str).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  close() {
    this.setState({ modalFormAplikasi: false });
  }

  open() {
    this.setState({ modalFormAplikasi: true });
  }
  render(){
    return(
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          <Glyphicon glyph="edit" />  Tambah Aplikasi
        </Button>
        <Modal show={this.state.modalFormAplikasi} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Data Aplikasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_aplikasi" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalNama">
                <ControlLabel>Nama Aplikasi</ControlLabel>
                <FormControl
                  type="text"
                  name="nama"
                  placeholder="Nama Aplikasi"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalIpLokal">
                <ControlLabel>IP Lokal</ControlLabel>
                <FormControl
                  type="text"
                  name="ip_lokal"
                  placeholder="IP Lokal"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalIpPublik">
                <ControlLabel>IP Publik</ControlLabel>
                <FormControl
                  type="text"
                  name="ip_public"
                  placeholder="IP Publik"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="text"
                  name="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelectJenisAplikasi">
                <ControlLabel>Jenis Aplikasi</ControlLabel>
                {this.renderJenisAplikasi()}
              </FormGroup>
              <FormGroup controlId="formControlsSelectLokasiAplikasi">
                <ControlLabel>Lokasi Database</ControlLabel>
                {this.renderLokasiDatabase()}
              </FormGroup>
              <FormGroup controlId="formControlsTextareaKeterangan">
                <ControlLabel>Keterangan</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Keterangan" name="keterangan" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_tambah_aplikasi">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default TambahAplikasi;
