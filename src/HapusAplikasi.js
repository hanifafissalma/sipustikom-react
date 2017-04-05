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

class HapusAplikasi extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormAplikasi: false
    };
    this.api= new Rest(service,addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.api.del('application/delete/'+this.props.aplikasi.id).then(
      (res) => {
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
  render() {
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Hapus Aplikasi
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
        <Modal show={this.state.modalFormAplikasi} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Hapus Data Aplikasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="form_hapus_aplikasi" onSubmit={this.handleSubmit}>
              Anda yakin ingin menghapus data aplikasi <b>{this.props.aplikasi.nama}</b> ?
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_hapus_aplikasi">Hapus</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HapusAplikasi;
