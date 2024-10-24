import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../../features/bookingsSlice"; // Import the addBooking action
import { initiateStripePayment } from "../../utils/stripePayment"; // Stripe payment helper function

const BookingFormCard = () => {
  const [formData, setFormData] = useState({
    title: '',
    subheader: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [showCard, setShowCard] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBooking({ ...formData, id: Date.now() })); // Add a unique ID to the booking
    alert("Booking submitted successfully!");
    setShowCard(true);
  };

  const handleBookNow = async () => {
    try {
      await initiateStripePayment(formData.price);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      {!showCard ? (
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
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            style={styles.input}
          />
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.title}>{formData.title}</h2>
          <h4 style={styles.subheader}>{formData.subheader}</h4>
          <p style={styles.description}>{formData.description}</p>
          {formData.imageUrl && (
            <img
              src={imagePreview || formData.imageUrl}
              alt="Accommodation"
              style={styles.image}
            />
          )}
          <p style={styles.price}>Price: ${formData.price}</p>
          <div style={styles.buttonContainer}>
            <button style={styles.bookButton} onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: 'auto',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  card: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subheader: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default BookingFormCard;
