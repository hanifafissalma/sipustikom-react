import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import Rest from 'fetch-on-rest';
import {addOptions} from './config.js';

class HapusPerangkat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormPerangkat: false
    };
    this.api = new Rest('http://localhost/sipustikom-service/public/api/device',addOptions,false);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ modalFormPerangkat: false });
  }

  open() {
    this.setState({ modalFormPerangkat: true });
  }

  handleSubmit(e){
    e.preventDefault();
    this.api.del('delete/'+this.props.perangkat.id).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  render() {
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Hapus Perangkat
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
        <Modal show={this.state.modalFormPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Hapus Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="form_hapus_perangkat" onSubmit={this.handleSubmit}>
                Anda yakin ingin menghapus data perangkat <b>{this.props.perangkat.nama}</b> ?
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button form="form_hapus_perangkat" type="submit" >Hapus</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HapusPerangkat;
