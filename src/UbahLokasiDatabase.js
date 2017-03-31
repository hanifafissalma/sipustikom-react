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


class UbahLokasiDatabase extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormDatabase: false,
    };
    this.api = new Rest ("http://localhost/sipustikom-service/public/api",addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ modalFormDatabase: false });
  }

  open() {
    this.setState({
      modalFormDatabase: true,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    var str = serialize(event.target, {hash:true});

    this.api.post('database/save',str).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }

  render(){
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Ubah Lokasi Database
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
        <Modal show={this.state.modalFormDatabase} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Data Lokasi Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="form_ubah_lokasi_database" onSubmit={this.handleSubmit}>
              <input
                type="hidden"
                name="id"
                defaultValue={this.props.lokasiDatabase.id}
              />
              <FormGroup controlId="formHorizontalIpDatabase">
                <ControlLabel>IP Database</ControlLabel>
                <FormControl
                  defaultValue={this.props.lokasiDatabase.ip_address}
                  type="text"
                  name="ip_address"
                  placeholder="IP Database"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalUsername">
                <ControlLabel>Username Database</ControlLabel>
                <FormControl
                  defaultValue={this.props.lokasiDatabase.username}
                  type="text"
                  name="username"
                  placeholder="Username Database"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password Database</ControlLabel>
                <FormControl
                  defaultValue={this.props.lokasiDatabase.password}
                  type="text"
                  name="password"
                  placeholder="Password Database"
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextareaKeterangan">
                <ControlLabel>Keterangan</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Keterangan" name="keterangan" defaultValue={this.props.lokasiDatabase.keterangan}/>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_ubah_lokasi_database">Simpan</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default UbahLokasiDatabase;
