import React from "react";

function BookingForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>Add a New Booking</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Subheader (Date):</label>
        <input
          type="text"
          name="subheader"
          value={formData.subheader}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.submitButton}>Add Booking</button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 12px grey",
    maxWidth: "400px",
    margin: "auto",
    height:"550px"
  },
  formTitle: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "border-color 0.2s",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    height: "100px",
    transition: "border-color 0.2s",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "background-color 0.3s",
  },
};

// Don't forget to export your component
export default BookingForm;
