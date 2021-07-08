import React from "react";
import { Table, Accordion, Card } from "react-bootstrap";

export const hanlderRemove = () => {
  console.log("eres duro");
};

export const TableCustomer = ({ data }) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Addresses</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={data.id} className="addresses">
            <td>{index + 1}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.email}</td>
            <td>{data.gender === 1 ? "Male" : "Female"}</td>
            <td>
              {data.addresses[0] && (
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Address</th>
                              <th>Province</th>
                              <th>Municipality</th>
                              <th>Sector</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.addresses.map((address, index) => (
                              <tr key={address.id}>
                                <td>{index + 1}</td>
                                <td>{address.address}</td>
                                <td>
                                  {address.sector.municipality.province.name}
                                </td>
                                <td>{address.sector.municipality.name}</td>
                                <td>{address.sector.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              )}
            </td>
            <td onClick={hanlderRemove}>🧺</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
