import React from "react";
import { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    console.log("Hello");
    getCars();
  }, []);

  const getCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))
      .catch(err => console.log(err));
  };

  const deleteCar = event => {
    event.preventDefault();
    setCars(cars.filter((_, index) => index !== parseInt(event.target.id)));
  };

  const columns = [
    {
      Header: "Brand",
      accessor: "brand"
    },
    {
      Header: "Model",
      accessor: "model"
    },
    {
      Header: "Color",
      accessor: "color"
    },
    {
      Header: "Year",
      accessor: "year"
    },

    {
      Header: "Fuel",
      accessor: "fuel"
    },
    {
      Header: "Price (€)",
      accessor: "price"
    },
    {
      accessor: "_links.self.href",
      Cell: ({ index }) => (
        <button id={index} onClick={deleteCar}>
          Delete
        </button>
      ),
      filterable: false,
      sortable: false
    }
  ];

  return (
    <div>
      <ReactTable
        defaultPageSize={10}
        filterable={true}
        data={cars}
        columns={columns}
      />
    </div>
  );
}
