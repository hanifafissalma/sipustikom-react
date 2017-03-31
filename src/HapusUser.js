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
class HapusUser extends Component{
  constructor(props) {
    super(props);
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
    this.api.del('delete/'+this.props.user.id).then(
      (res)=>{
        this.close();
        window.location.reload();
      }
    )
  }
  render() {
    const tooltip = (
      <Tooltip  placement="bottom" className="in" id="tooltip-bottom">
        Hapus User
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
        <Modal show={this.state.modalFormUser} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Hapus Data User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="form_hapus_user" onSubmit={this.handleSubmit}>
              Anda yakin ingin menghapus data dengan username = <b>{this.props.user.username}</b>?
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="form_hapus_user">Hapus</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HapusUser;
