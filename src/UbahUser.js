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
import {addOptions} from './config.js';
var serialize = require('form-serialize');

class UbahUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormUser: false,
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
    this.setState({
      modalFormUser: true,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    var str = serialize(event.target, {hash:true});

    this.api.post('save',str).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }

  render() {
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Ubah User
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
        <Modal show={this.state.modalFormUser} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Data User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_ubah_user" onSubmit={this.handleSubmit}>
              <input
                defaultValue={this.props.user.id}
                type="hidden"
                name="id"
              />
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username</ControlLabel>
                <input
                  defaultValue={this.props.user.username}
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Masukkan Username"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Role</ControlLabel>
                <FormControl defaultValue={this.props.user.role} componentClass="select" placeholder="Pilih Role" name="role">
                  <option value="app">Aplikasi</option>
                  <option value="net">Jaringan</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_ubah_user">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UbahUser;
