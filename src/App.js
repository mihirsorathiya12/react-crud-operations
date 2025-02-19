import React, { useState, useMemo, useCallback } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Memoize the data list to avoid unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  const handleSubmit = useCallback(() => {
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
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
       
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
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
          <p>No data available. Please add some entries.</p>
        )}
      </div>
    </div>
  );
};

export default App;
