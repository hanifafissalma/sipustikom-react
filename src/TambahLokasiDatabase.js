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

class TambahLokasiDatabase extends Component{
  constructor() {
    super();
    this.state = {
      modalFormDatabase: false
    };
    this.api= new Rest('http://localhost/sipustikom-service/public/api',addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var str = serialize(e.target,{hash:true});

    this.api.post('database/save',str).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  close() {
    this.setState({ modalFormDatabase: false });
  }

  open() {
    this.setState({ modalFormDatabase: true });
  }
  render(){
    return(
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          <Glyphicon glyph="edit" />  Tambah Lokasi Database
        </Button>
        <Modal show={this.state.modalFormDatabase} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Data Lokasi Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_lokasi_database" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalIpDatabase">
                <ControlLabel>IP Database</ControlLabel>
                <FormControl
                  type="text"
                  name="ip_address"
                  placeholder="IP Database"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username Database</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Username Database"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password Database</ControlLabel>
                <FormControl
                  type="text"
                  name="password"
                  placeholder="Password Database"
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
            <Button type="submit" form="form_tambah_lokasi_database">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default TambahLokasiDatabase;
