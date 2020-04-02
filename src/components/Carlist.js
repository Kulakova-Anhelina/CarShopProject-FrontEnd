import React from "react";
import { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))
      .then(_ => setOpen(true))
      .catch(err => console.log(err));
  };

  const deleteCar = link => {
    if (window.confirm("Are u sure")) {
      fetch(link, { method: "DELETE" })
        .then(response => fetchData())
        .then(response => {
          setMsg('Car Deleted')
          setOpen(true)
        })
        .catch(err => console.log(err));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const saveCar = car => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(response => fetchData())
      .catch(err => console.log(err))
      .then(response => {
        setMsg('Car added')
        setOpen(true)
      })
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(response => fetchData())
      .catch(err => console.log(err))
      .then(response => {
        setMsg('Car updated')
        setOpen(true)
      });
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
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => <Editcar updateCar={updateCar} car={row.original} />
    },
    {
      accessor: "_links.self.href",
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => (
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          color="secondary"
          size="small"
          onClick={() => deleteCar(row.value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <Addcar saveCar={saveCar} />
      <ReactTable
        defaultPageSize={10}
        filterable={true}
        data={cars}
        columns={columns}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
      />
    </div>
  );
}
