import React from 'react';

function BookingCard({ booking, onEdit, onDelete }) {
    return (
        <div style={styles.card}>
            <h2>{booking.title}</h2>
            <h3>{booking.subheader}</h3>
            <p>{booking.description}</p>
            {booking.imageUrl && <img src={booking.imageUrl} alt={booking.title} style={styles.image} />}
            <div style={styles.buttonContainer}>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}

// Styles for the card
const styles = {
    card: {
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
    buttonContainer: {
        marginTop: '10px',
    },
};

export default BookingCard;
