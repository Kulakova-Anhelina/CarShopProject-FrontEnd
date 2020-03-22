import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BorderColorIcon from "@material-ui/icons/BorderColor";

export default function Editcar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    fuel: "",
    price: ""
  });

  const handleClickOpen = () => {
    setCar({
        brand:props.car.brand,
        model: props.car.model,
        color: props.car.color,
        year: props.car.year,
        fuel: props.car.fuel,
        price: props.car.price
        
    })
    setOpen(true);
    console.log(props.car)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = event => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };
  const addCar = () => {
    props.saveCar(car);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<BorderColorIcon />}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            onChange={e => handleInput(e)}
            value={car.brand}
            label="Brand"
            fullWidth
          />
          <TextField
            margin="dense"
            name="model"
            onChange={e => handleInput(e)}
            value={car.model}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            name="color"
            onChange={e => handleInput(e)}
            value={car.color}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            name="year"
            onChange={e => handleInput(e)}
            value={car.year}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            name="fuel"
            onChange={e => handleInput(e)}
            value={car.fuel}
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            name="price"
            onChange={e => handleInput(e)}
            value={car.price}
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
