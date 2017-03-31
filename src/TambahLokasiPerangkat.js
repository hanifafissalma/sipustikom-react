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

class TambahLokasiPerangkat extends Component{
  constructor() {
    super();
    this.state = {
      modalFormLokasiPerangkat: false
    };
    this.api=new Rest('http://localhost/sipustikom-service/public/api',addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ modalFormLokasiPerangkat: false });
  }

  open() {
    this.setState({ modalFormLokasiPerangkat: true });
  }
  handleSubmit(e){
    e.preventDefault();
    var str= serialize(e.target,{hash:true});

    this.api.post('references/location/save', str).then(
      (res)=>{
        this.close();
        window.location.reload();
        console.log(res);
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
          <Glyphicon glyph="edit" />  Tambah Lokasi Perangkat
        </Button>
        <Modal show={this.state.modalFormLokasiPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Lokasi Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_lokasi_perangkat" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalNamaLokasi">
                <ControlLabel>Nama Lokasi</ControlLabel>
                <FormControl
                  type="text"
                  name="nama"
                  placeholder="Nama Lokasi"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalAlamatLokasi">
                <ControlLabel>Alamat Lokasi</ControlLabel>
                  <FormControl
                    type="text"
                    name="alamat"
                    placeholder="Alamat Lokasi"
                    required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalNoTelepon">
                <ControlLabel>No. Telepon Lokasi</ControlLabel>
                  <FormControl
                    type="text"
                    name="telp"
                    placeholder="No. Telepon Lokasi"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalLantai">
                <ControlLabel>Jumlah Lantai</ControlLabel>
                <FormControl
                  type="text"
                  name="jumlah_lantai"
                  placeholder="Jumlah Lantai"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalRuangan">
                <ControlLabel>Jumlah Ruangan</ControlLabel>
                <FormControl
                  type="text"
                  name="jumlah_ruangan"
                  placeholder="Jumlah Ruangan"
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_tambah_lokasi_perangkat">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TambahLokasiPerangkat;
