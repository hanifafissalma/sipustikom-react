import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import Rest from 'fetch-on-rest';
import {addOptions, service} from './config.js';

var serialize = require('form-serialize');

class UbahPerangkat extends Component{
  constructor(props) {
    super(props);
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
    <FormControl componentClass="select" name="jenis"  defaultValue={this.props.perangkat.jenis.id}>
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
      <FormControl componentClass="select" name="merk" defaultValue={this.props.perangkat.merk.id}>
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
      <FormControl componentClass="select" name="lokasi" defaultValue={this.props.perangkat.lokasi.id}>
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
    const tooltip = (
      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
        Ubah Perangkat
      </Tooltip>
    );
    return (
      <div>
        <OverlayTrigger overlay={tooltip}>
          <Button
            bsStyle="warning"
            bsSize="sm"
            onClick={this.open}
          >
            <Glyphicon glyph="edit" />
          </Button>
        </OverlayTrigger>
        <Modal show={this.state.modalFormPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_perangkat" onSubmit={this.handleSubmit}>
              <input
                defaultValue={this.props.perangkat.id}
                type="hidden"
                name="id"
              />
              <FormGroup controlId="formHorizontalTipePerangkat">
                <ControlLabel>Tipe Perangkat</ControlLabel>
                <input
                  defaultValue={this.props.perangkat.tipe}
                  className="form-control"
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
                <input
                  defaultValue={this.props.perangkat.nama}
                  className="form-control"
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
                <input
                 defaultValue={this.props.perangkat.ip_address}
                 className="form-control"
                 type="text"
                 name="ip_address"
                 placeholder="IP Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalIpAlternatif">
                <ControlLabel>IP Alternatif</ControlLabel>
                <input
                 defaultValue={this.props.perangkat.ip_alternatif}
                 className="form-control"
                 type="text"
                 name="ip_alternatif"
                 placeholder="IP Alternatif"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username Perangkat</ControlLabel>
                <input
                 defaultValue={this.props.perangkat.username}
                 className="form-control"
                 type="text"
                 name="username"
                 placeholder="Username Perangkat"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password Perangkat</ControlLabel>
                <FormControl
                  defaultValue={this.props.perangkat.password}
                 type="text"
                 name="password"
                 placeholder="Password Perangkat"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalSsid">
                <ControlLabel>SSID Perangkat</ControlLabel>
                <FormControl
                  defaultValue={this.props.perangkat.ssid}
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
                  defaultValue={this.props.perangkat.lantai}
                 type="text"
                 name="lantai"
                 placeholder="Lantai Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalRuangPerangkat">
                <ControlLabel>Ruang Perangkat</ControlLabel>
                <FormControl
                  defaultValue={this.props.perangkat.ruang}
                 type="text"
                 name="ruang"
                 placeholder="Ruang Perangkat"
                 required="required"
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextareaKeterangan">
                <ControlLabel>Keterangan</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Keterangan" name="keterangan"defaultValue={this.props.perangkat.keterangan}/>
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

export default UbahPerangkat;
