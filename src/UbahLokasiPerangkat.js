import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  Form,
  FormGroup,
  ControlLabel,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import Rest from 'fetch-on-rest';
import {addOptions, service} from './config.js';

var serialize = require('form-serialize');

class UbahLokasiPerangkat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormLokasiPerangkat: false
    };
    this.api = new Rest(service,addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var str = serialize(e.target, {hash:true});

    this.api.post('references/location/save',str).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  close() {
    this.setState({ modalFormLokasiPerangkat: false });
  }

  open() {
    this.setState({ modalFormLokasiPerangkat: true });
  }
  render(){
    const tooltip = (
      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
        Ubah Lokasi Perangkat
      </Tooltip>
    );
    return(
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
        <Modal show={this.state.modalFormLokasiPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Lokasi Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_ubah_lokasi_perangkat" onSubmit={this.handleSubmit}>
              <input
                defaultValue={this.props.LokasiPerangkat.id}
                type="hidden"
                name="id"
              />
              <FormGroup controlId="formHorizontalNamaLokasi">
                <ControlLabel>Nama Lokasi</ControlLabel>
                <input
                  className="form-control"
                  defaultValue={this.props.LokasiPerangkat.nama}
                  type="text"
                  name="nama"
                  placeholder="Nama Lokasi"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalAlamatLokasi">
                <ControlLabel>Alamat Lokasi</ControlLabel>
                <input
                  className="form-control"
                  defaultValue={this.props.LokasiPerangkat.alamat}
                  type="text"
                  name="alamat"
                  placeholder="Alamat Lokasi"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalNoTelepon">
                <ControlLabel>No. Telepon Lokasi</ControlLabel>
                <input
                  className="form-control"
                  defaultValue={this.props.LokasiPerangkat.telp}
                  type="text"
                  name="telp"
                  placeholder="No. Telepon Lokasi"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalJumlahLantai">
                <ControlLabel>Jumlah Lantai</ControlLabel>
                <input
                  className="form-control"
                  defaultValue={this.props.LokasiPerangkat.jumlah_lantai}
                  type="text"
                  name="jumlah_lantai"
                  placeholder="Jumlah Lantai"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalJumlahRuang">
                <ControlLabel>Jumlah Ruangan</ControlLabel>
                <input
                  className="form-control"
                  defaultValue={this.props.LokasiPerangkat.jumlah_ruangan}
                  type="text"
                  name="jumlah_ruangan"
                  placeholder="Jumlah Ruangan"
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_ubah_lokasi_perangkat">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default UbahLokasiPerangkat;
