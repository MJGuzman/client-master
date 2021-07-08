import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Col, Row } from "react-bootstrap";
import { TableCustomer } from "../../components/Table";
import { urls } from "../../constants/urls";
import axiosInstance from "../../helpers/axiosInstance";

export const Home = () => {
  const [customers, setcustomers] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/customers")
      .then((resp) => {
        setcustomers(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row className="mb-4">
        <Col className="col-12 d-flex justify-content-between">
          <h2>Yours Customers</h2>
          <Link className="btn btn-outline-primary btn-sm" to={urls.create}>
            Add Customer
          </Link>
        </Col>
      </Row>
      <Row>{customers[0] && <TableCustomer data={customers} />}</Row>
    </>
  );
};
