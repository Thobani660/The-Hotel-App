// src/pages/admin/BookingForm.jsx
import React, { useState } from "react";

const BookingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        subheader: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass form data to the parent component
        setFormData({
            title: '',
            subheader: '',
            description: '',
            price: '',
            imageUrl: ''
        });
    };

    return (
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
            />
            <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                required
                style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
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
    }
};

export default BookingForm;
