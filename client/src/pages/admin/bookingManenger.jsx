import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, updateBooking } from "../../features/bookingsSlice";
import { initiateStripePayment } from "../../utils/stripePayment";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const BookingManager = ({ initialData = {}, onEdit, onDelete, isAdmin }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    subheader: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateDoc(doc(db, "bookings", formData.id), formData);
        dispatch(updateBooking(formData));
      } else {
        const docRef = await addDoc(collection(db, "bookings"), formData);
        const newBooking = { ...formData, id: docRef.id };
        dispatch(addBooking(newBooking));
      }
      setFormData({
        id: null,
        title: "",
        subheader: "",
        description: "",
        price: "",
        imageUrl: "",
      });
      onEdit(false); // Close edit mode after submission
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleBookNow = async () => {
    try {
      await initiateStripePayment(formData.price, formData); // Use the price and form data for payment
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="subheader"
          value={formData.subheader}
          onChange={handleChange}
          placeholder="Subheader"
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={styles.input}
          min="0"
        />
        <input
          type="url"
          name="imageUrl"
          onChange={handleImageUpload}
          placeholder="Image URL"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          {formData.id ? "Update Booking" : "Create Booking"}
        </button>
      </form>

      {formData.imageUrl && (
        <div style={styles.card}>
          <h2 style={styles.title}>{formData.title}</h2>
          <h4 style={styles.subheader}>{formData.subheader}</h4>
          <p style={styles.description}>{formData.description}</p>
          <img src={formData.imageUrl} alt="Accommodation" style={styles.image} />
          <p style={styles.price}>Price: ${formData.price}</p>

          <div style={styles.buttonContainer}>
            <button style={{ ...styles.button, ...styles.bookButton }} onClick={handleBookNow}>
              Book Now
            </button>
            {isAdmin && (
              <div>
                <button style={{ ...styles.button, ...styles.editButton }} onClick={() => onEdit(formData.id)}>
                  Edit
                </button>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => onDelete(formData.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "15px",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subheader: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#777",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "15px",
  },
  button: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s, transform 0.2s",
    minWidth: "100px",
  },
  bookButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
};

export default BookingManager;
