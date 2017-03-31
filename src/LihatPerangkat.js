import React, {Component} from 'react';
import {
  Button,
  Modal,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
  Table
} from 'react-bootstrap';

class LihatPerangkat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalFormPerangkat: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ modalFormPerangkat: false });
  }

  open() {
    this.setState({ modalFormPerangkat: true });
  }

  render() {
    const tooltip = (
      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
        Lihat Detil
      </Tooltip>
    );
    return (
      <div>
        <OverlayTrigger overlay={tooltip}>
          <Button
            bsStyle="primary"
            bsSize="sm"
            onClick={this.open}
          >
            <Glyphicon glyph="eye-open" />
          </Button>
        </OverlayTrigger>
        <Modal show={this.state.modalFormPerangkat} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Lihat Perangkat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover responsive>
              <tbody>
                <tr>
                  <td><b>Tipe Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.tipe}</td>
                </tr>
                <tr>
                  <td><b>Merk Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.merk.nama}</td>
                </tr>
                <tr>
                  <td><b>Nama Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.nama}</td>
                </tr>
                <tr>
                  <td><b>Jenis Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.jenis.nama}</td>
                </tr>
                <tr>
                  <td><b>IP Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.ip_address}</td>
                </tr>
                <tr>
                  <td><b>IP Alternatif</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.ip_alternatif}</td>
                </tr>
                <tr>
                  <td><b>Username Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.username}</td>
                </tr>
                <tr>
                  <td><b>Password Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.password}</td>
                </tr>
                <tr>
                  <td><b>SSID Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.ssid}</td>
                </tr>
                <tr>
                  <td><b>Lokasi Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.lokasi.nama}</td>
                </tr>
                <tr>
                  <td><b>Lantai Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.lantai}</td>
                </tr>
                <tr>
                  <td><b>Ruang Perangkat</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.ruang}</td>
                </tr>
                <tr>
                  <td><b>Keterangan</b></td>
                  <td>:</td>
                  <td>{this.props.perangkat.keterangan}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Tutup</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LihatPerangkat;
