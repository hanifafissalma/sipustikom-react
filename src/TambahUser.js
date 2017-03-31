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

class TambahUser extends Component{
  constructor() {
    super();
    this.state = {
      modalFormUser: false
    };
    this.api = new Rest ("http://localhost/sipustikom-service/public/api/user",addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ modalFormUser: false });
  }

  open() {
    this.setState({ modalFormUser: true });
  }

  handleSubmit(e){
    e.preventDefault();
    var abc = serialize(e.target,{ hash: true });

    this.api.post('save',abc).then(
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
          <Glyphicon glyph="edit" />  Tambah User
        </Button>
        <Modal show={this.state.modalFormUser} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_tambah_user" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Masukkan Username"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Masukkan Password User"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formControlsRole">
                <ControlLabel>Role</ControlLabel>
                <FormControl componentClass="select" placeholder="Pilih Role" name="role">
                  <option value="app">Aplikasi</option>
                  <option value="net">Jaringan</option>
                  <option value="super">Master</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_tambah_user">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TambahUser;
