import { Col, Row, Table, Form, Button } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Row className="mb-4">
        <Col className="col-9 text">
          <h2>Yours Customers</h2>
        </Col>
        <Col className="col-3">
          <Button variant="outline-success" size="sm">
            Add customer
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default App;
