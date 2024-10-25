// src/components/BookingForm.js
import React, { useState, useEffect } from "react";

const BookingForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        title: '',
        subheader: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file); // Convert file to base64
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass form data to parent (AdminProfile)
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
                min="0"
            />
            <input
                type="file"
                name="imageUrl"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={styles.fileInput}
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
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    fileInput: {
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
};

export default BookingForm;
