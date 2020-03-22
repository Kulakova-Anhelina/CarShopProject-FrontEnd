import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Addcar(props) {
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
    setOpen(true);
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
        style={{ margin: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Add car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New car</DialogTitle>
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
