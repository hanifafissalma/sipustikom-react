import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import Rest from 'fetch-on-rest';
import {addOptions, service} from './config.js';
class HapusLokasiDatabase extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormDatabase: false
    };
    this.api =  new Rest(service,addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.api.del('database/delete/'+this.props.lokasiDatabase.id).then(
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
  render() {
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Hapus Lokasi Database
      </Tooltip>
    );
    return (
      <div>
        <OverlayTrigger overlay={tooltip}>
          <Button
            bsStyle="danger"
            bsSize="sm"
            onClick={this.open}
          >
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
        <Modal show={this.state.modalFormDatabase} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Hapus Lokasi Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="form_hapus_lokasi_database" onSubmit={this.handleSubmit}>
              Anda yakin ingin menghapus database dengan IP = <b>{this.props.lokasiDatabase.ip_address}</b> ?
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_hapus_lokasi_database" >Hapus</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HapusLokasiDatabase;
