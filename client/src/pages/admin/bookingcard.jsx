import React from 'react';

function BookingCard({ booking, onEdit, onDelete }) {
    const [accommodations, setAccommodations] = useState([]); // Initialize as an empty array
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await fetch('/api/accommodations'); // Your API endpoint
                const data = await response.json();
                setAccommodations(data); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            }
        };
    
        fetchAccommodations();
    }, []);

    return (
        <div>
            {accommodations && accommodations.length > 0 ? (
                accommodations.map((booking) => (
                    <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        onEdit={() => handleEdit(booking.id)} 
                        onDelete={() => handleDelete(booking.id)} 
                    />
                ))
            ) : (
                <p>No accommodations available.</p> // Fallback UI
            )}
        </div>
    );
}

// Styles for the card
const styles = {
    card: {
        background: '#f9f9f9',  // Light background for contrast
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)', // Soft shadow
        margin: '20px', // Spacing around cards
        transition: 'transform 0.2s', // Animation on hover
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px',
    },
    subheader: {
        fontSize: '1.2rem',
        fontWeight: '400',
        color: '#555',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '15px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '15px', // Spacing below the image
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Soft shadow around image
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s', // Smooth hover effect
    },
};

// Add hover effect to the card
styles.card[':hover'] = {
    transform: 'scale(1.05)', // Slightly enlarge on hover
};

export default BookingCard;
