import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { urls } from "../../constants/urls";
import axiosInstance from "../../helpers/axiosInstance";

export const Create = ({ history }) => {
  const { register, handleSubmit } = useForm();

  const [provinces, setProvinces] = useState([]);
  const [municipalities, setmunicipalities] = useState([]);
  const [sectors, setsectors] = useState([]);
  const [provinceId, setprovinceId] = useState(0);
  const [dataAddresses, setDataAddresses] = useState([]);
  const [dataAddressess, setDataAddressess] = useState([]);

  // console.log(dataAddresses);

  useEffect(() => {
    axiosInstance
      .get("/provinces")
      .then((resp) => {
        setProvinces(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProvince = async ({ target }) => {
    let municipalities = await axiosInstance.get(
      `provinces/${target.value}/municipalities`
    );
    setprovinceId(target.value);
    setmunicipalities(municipalities.data);
    setDataAddresses({ ...dataAddresses, provinceId: parseInt(target.value) });
  };

  const handleMunicipality = async ({ target }) => {
    let sectors = await axiosInstance.get(
      `provinces/${provinceId}/municipalities/${target.value}/sectors`
    );
    setsectors(sectors.data);
    setDataAddresses({
      ...dataAddresses,
      municipalityId: parseInt(target.value),
    });
  };

  const handleOnSubmit = (data) => {
    let newData = Object.assign(data, { addresses: dataAddressess });
    console.log({ ...newData, gender: parseInt(newData.gender) });
    console.log(newData);

    axiosInstance
      .post("/customers", { ...newData, gender: parseInt(newData.gender) })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleAddNewAddress = () => {
    setDataAddressess([...dataAddressess, dataAddresses]);
  };

  console.log(dataAddressess);

  return (
    <>
      <Row>
        <Col className="col-12 mb-5 d-flex justify-content-between">
          <h2>Create Customer</h2>
          <Link className="btn btn-outline-primary btn-sm" to={urls.home}>
            Back to home
          </Link>
        </Col>

        <Col className="col-12">
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register("firstName", { required: true })}
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...register("lastName", { required: true })}
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  {...register("gender", { required: true })}
                  as="select"
                  defaultValue="Choose..."
                >
                  <option value="">Choose...</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            {/* Address */}

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                placeholder="1234 Main St"
                name="address"
                onChange={(e) =>
                  setDataAddresses({
                    ...dataAddresses,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  required
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => {
                    handleProvince(e);
                    setDataAddresses({
                      ...dataAddresses,
                      address: e.target.value,
                    });
                  }}
                >
                  <option>Choose...</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMunicipality">
                <Form.Label>Municipality</Form.Label>
                <Form.Control
                  required
                  as="select"
                  defaultValue="Choose..."
                  onChange={handleMunicipality}
                >
                  <option>Choose...</option>
                  {municipalities.map((municipality) => (
                    <option
                      key={municipality.municipalityId}
                      value={municipality.municipalityId}
                    >
                      {municipality.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSector">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  required
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => {
                    setDataAddresses({
                      ...dataAddresses,
                      sectorId: parseInt(e.target.value),
                    });
                  }}
                >
                  <option>Choose...</option>
                  {sectors.map((sector) => (
                    <option key={sector.sectorId} value={sector.sectorId}>
                      {sector.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                size="sm"
                onClick={handleAddNewAddress}
                className="btn btn-outline-warning btn-sm"
              >
                Add New Address
              </Button>
            </Form.Row>

            {dataAddressess[0] && (
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Address</th>
                    <th>Municipality</th>
                    <th>Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAddressess.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.address}</td>
                      <td>{data.municipalityId}</td>
                      <td>{data.sectorId}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
