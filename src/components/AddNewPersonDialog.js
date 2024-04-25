import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddPersonDialog = ({ open, onClose, onAddPerson }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [errors, setErrors] = useState({});

  const swedishAreas = [
    "Dalarna",
    "Halland",
    "Malmo",
    "Solna",
    "Uppsala",
    "Gotland",
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddPerson = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors = { ...newErrors, name: "Name is required" };
    }

    if (!email.trim()) {
      newErrors = { ...newErrors, email: "Email is required" };
    } else if (!validateEmail(email)) {
      newErrors = { ...newErrors, email: "Please enter a valid email address" };
    }

    if (!area.trim()) {
      newErrors = { ...newErrors, area: "Area is required" };
    }

    if (Object.keys(newErrors).length === 0) {
      onAddPerson({ name, email, area });
      setName("");
      setEmail("");
      setArea("");
      setErrors({});
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Person</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth error={!!errors.area} helperText={errors.area}>
          <InputLabel>Area</InputLabel>
          <Select value={area} onChange={(e) => setArea(e.target.value)}>
            <MenuItem value="">Select an area</MenuItem>
            {swedishAreas.map((areaName) => (
              <MenuItem key={areaName} value={areaName}>
                {areaName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddPerson} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPersonDialog;
