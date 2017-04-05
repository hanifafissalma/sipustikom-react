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
import {addOptions, service} from './config.js';

var serialize = require ('form-serialize');

class TambahPerangkat extends Component{
  constructor() {
    super();
    this.state = {
      modalFormPerangkat: false,
      jenisPerangkat:[],
      merkPerangkat:[],
      lokasiPerangkat:[]
    };
    this.api = new Rest (service,addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.getJenisPerangkat();
    this.getMerkPerangkat();
    this.getLokasiPerangkat();
  }

  getJenisPerangkat(){
    var self=this;
    this.api.get('references/device/all').then(
      (res)=>{
        self.setState({
          jenisPerangkat:res.data
        })
      }
    )
  }

  getMerkPerangkat(){
    var self=this;
    this.api.get('references/brand/all').then(
      (res)=>{
        self.setState({
          merkPerangkat:res.data
        })
      }
    )
  }

  getLokasiPerangkat(){
    var self=this;
    this.api.get('references/location/all').then(
      (res)=>{
        self.setState({
          lokasiPerangkat:res.data
        })
      }
    )
  }

  renderJenisPerangkat(){
    var listJenisPerangkat = this.state.jenisPerangkat.map((data,index)=>
        <option key={index} value={data.id}>{data.nama}</option>
      );
    return(
    <FormControl componentClass="select" name="jenis">
      <option value="">--Pilih Jenis Perangkat--</option>
      {listJenisPerangkat}
    </FormControl>
    )
  }

  renderMerkPerangkat(){
    var listMerkPerangkat = this.state.merkPerangkat.map((data,index)=>
      <option key={index} value={data.id}>{data.nama}</option>
    );
    return(
      <FormControl componentClass="select" name="merk">
        <option value="">--Pilih Merk Perangkat--</option>
        {listMerkPerangkat}
      </FormControl>
    )
  }

  renderLokasiPerangkat(){
    var listLokasiPerangkat =  this.state.lokasiPerangkat.map((data,index)=>
      <option key={index} value={data.id}>{data.nama}</option>
    );
    return(
      <FormControl componentClass="select" name="lokasi">
        <option value="">--Pilih Lokasi Perangkat--</option>
        {listLokasiPerangkat}
      </FormControl>
    )
  }
  close() {
    this.setState({ modalFormPerangkat: false });
  }

  open() {
    this.setState({ modalFormPerangkat: true });
  }

  handleSubmit(e){
    e.preventDefault();
    var def =  serialize(e.target,{hash:true});
    console.log(def);
    this.api.post('device/save',def).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          <Glyphicon glyph="edit" />  Tambah Perangkat
        </Button>
        <Modal show={this.state.modalFormPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_perangkat" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalTipePerangkat">
                <ControlLabel>Tipe Perangkat</ControlLabel>
                <FormControl
                  type="text"
                  name="tipe"
                  placeholder="Tipe Perangkat"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalMerkPerangkat">
                <ControlLabel>Merk Perangkat</ControlLabel>
                {this.renderMerkPerangkat()}
              </FormGroup>
              <FormGroup controlId="formHorizontalNamaPerangkat">
                <ControlLabel>Nama Perangkat</ControlLabel>
                <FormControl
                  type="text"
                  name="nama"
                  placeholder="Nama Perangkat"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelectJenisPerangkat">
                <ControlLabel>Jenis Perangkat</ControlLabel>
                {this.renderJenisPerangkat()}
              </FormGroup>
              <FormGroup controlId="formHorizontalIpPerangkat">
                <ControlLabel>IP Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="ip_address"
                 placeholder="IP Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalIpAlternatif">
                <ControlLabel>IP Alternatif</ControlLabel>
                <FormControl
                 type="text"
                 name="ip_alternatif"
                 placeholder="IP Alternatif"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="username"
                 placeholder="Username Perangkat"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="password"
                 placeholder="Password Perangkat"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalSsid">
                <ControlLabel>SSID Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="ssid"
                 placeholder="SSID Perangkat"
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelectLokasiPerangkat">
                <ControlLabel>Lokasi Perangkat</ControlLabel>
                {this.renderLokasiPerangkat()}
              </FormGroup>
              <FormGroup controlId="formHorizontalLantaiPerangkat">
                <ControlLabel>Lantai Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="lantai"
                 placeholder="Lantai Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalRuangPerangkat">
                <ControlLabel>Ruang Perangkat</ControlLabel>
                <FormControl
                 type="text"
                 name="ruang"
                 placeholder="Ruang Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextareaKeterangan">
                <ControlLabel>Keterangan</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Keterangan" name="keterangan"/>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_tambah_perangkat">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TambahPerangkat;
