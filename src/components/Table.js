import React from "react";
import { Table } from "react-bootstrap";

export const TableCustomer = ({ data }) => {
  console.log("hols", data);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={data.id}>
            <td>{index + 1}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.email}</td>
            <td>{data.gender === 1 ? "Male" : "Female"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
