import React, { useState, useMemo, useCallback } from "react";
import { FormLabel } from '@mui/material';
import { TextField, Button, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Select, MenuItem, InputLabel, FormHelperText, Container, Grid, Typography } from '@mui/material';
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
    gender: "",
    terms: false,
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const memoizedData = useMemo(() => data, [data]);

  const handleSubmit = useCallback(() => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone) validationErrors.phone = "Phone is required";
    if (!formData.date) validationErrors.date = "Date is required";
    if (!formData.gender) validationErrors.gender = "Gender is required";
    if (!formData.country) validationErrors.country = "Country is required";
    if (!formData.terms) validationErrors.terms = "You must accept the terms";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    if (isEditing) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setData([...data, formData]);
    }
    setFormData({
      name: "",
      email: "",
      date: "",
      phone: "",
      gender: "",
      terms: false,
      country: "",
    });
  }, [data, formData, isEditing, editIndex]);

  const handleEdit = useCallback(
    (index) => {
      setFormData(data[index]);
      setIsEditing(true);
      setEditIndex(index);
    },
    [data]
  );

  const handleDelete = useCallback(
    (index) => {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
    },
    [data]
  );

  const handleView = (index) => {
    alert(`Name: ${data[index].name}\nEmail: ${data[index].email}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        React CRUD Operation
      </Typography>

      <div className="form-container">
        <TextField
          fullWidth
          label="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
        />

        <TextField
          fullWidth
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={Boolean(errors.date)}
          helperText={errors.date}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          type="tel"
          label="Enter Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          margin="normal"
        />

        <FormControl component="fieldset" margin="normal" error={Boolean(errors.gender)}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>

        <FormControl margin="normal" error={Boolean(errors.terms)}>
          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
            }
            label="I accept the terms and conditions"
          />
          {errors.terms && <FormHelperText>{errors.terms}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth margin="normal" error={Boolean(errors.country)}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <MenuItem value="">Select Country</MenuItem>
            <MenuItem value="INDIA">INDIA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
          </Select>
          {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isEditing ? "Update" : "Submit"}
        </Button>
      </div>

      <div className="data-list">
        {memoizedData.length > 0 ? (
          memoizedData.map((item, index) => (
            <div key={index} className="data-item">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <strong>Name:</strong> {item.name}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <strong>Email:</strong> {item.email}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <strong>Phone:</strong> {item.phone}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <strong>Date:</strong> {item.date}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <strong>Gender:</strong> {item.gender}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <strong>Country:</strong> {item.country}
                </Grid>
              </Grid>

              <div className="action-buttons">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleView(index)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            {/* No data available */}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default App;
