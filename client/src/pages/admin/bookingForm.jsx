import React, { useState } from "react";

function BookingForm({ formData, handleChange, handleSubmit }) {
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded image file
  const [imagePreview, setImagePreview] = useState(""); // State to hold the image preview URL

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file in state

      // Create a preview URL for the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const formDataWithImage = new FormData();
      formDataWithImage.append("title", formData.title);
      formDataWithImage.append("subheader", formData.subheader);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("image", imageFile); // Append the image file to the FormData

      // Call the provided handleSubmit function with the new form data
      await handleSubmit(formDataWithImage);
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
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
        <label style={styles.label}>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={styles.input}
        />
      </div>
      {imagePreview && (
        <div style={styles.imagePreview}>
          <img src={imagePreview} alt="Preview" style={styles.previewImage} />
        </div>
      )}
      <button type="submit" style={styles.submitButton}>Add Accommodation</button>
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
    height: "auto",
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
  imagePreview: {
    marginTop: "10px",
    textAlign: "center",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "200px",
    borderRadius: "5px",
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
