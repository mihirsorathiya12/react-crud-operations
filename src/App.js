import React, { useState, useMemo, useCallback } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
    gender: "", // Radio Button
    terms: false, // Checkbox
    country: "", // Select Field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle form field changes
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

  // Memoize the data list to avoid unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    // Form validation
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

    setErrors({}); // Clear errors if valid

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

  // Handle edit action
  const handleEdit = useCallback(
    (index) => {
      setFormData(data[index]);
      setIsEditing(true);
      setEditIndex(index);
    },
    [data]
  );

  // Handle delete action
  const handleDelete = useCallback(
    (index) => {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
    },
    [data]
  );

  // Handle view action
  const handleView = (index) => {
    alert(`Name: ${data[index].name}\nEmail: ${data[index].email}`);
  };

  return (
    <div className="app">
      <h1>React CRUD Operation</h1>

      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        {/* Radio Button for Gender */}
        <div>
          <label>Gender: </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        {/* Checkbox for Terms */}
        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I accept the terms and conditions
          </label>
        </div>
        {errors.terms && <p className="error">{errors.terms}</p>}

        {/* Select for Country */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="USA">INDIAN</option>
          <option value="Canada">UK</option>
          <option value="UK">USA</option>
        </select>
        {errors.country && <p className="error">{errors.country}</p>}

        <button
          className={`submit-btn ${isEditing ? "update-btn" : "submit-btn"}`}
          onClick={handleSubmit}
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </div>

      {/* Display the list of data below the form */}
      <div className="data-list">
        {memoizedData.length > 0 ? (
          memoizedData.map((item, index) => (
            <div key={index} className="data-item">
              <div><strong>Name:</strong> {item.name}</div>
              <div><strong>Email:</strong> {item.email}</div>
              <div><strong>Phone:</strong> {item.phone}</div>
              <div><strong>Date:</strong> {item.date}</div>
              <div><strong>Gender:</strong> {item.gender}</div>
              <div><strong>Country:</strong> {item.country}</div>
             
              <div className="action-buttons">
                <button className="view-btn" onClick={() => handleView(index)}>
                  View
                </button>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>   </p>
        )}
      </div>
    </div>
  );
};

export default App;
