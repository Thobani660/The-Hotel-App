import React, { useState, useEffect } from 'react';
import BookingCard from './admin/bookingcard'; // Assuming you have a BookingCard component

const Accommodation = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To manage error state

    // Function to fetch accommodations data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/accommodations'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch accommodations');
                }
                const data = await response.json();
                setAccommodations(data); // Assuming data is an array of accommodations
            } catch (err) {
                setError(err.message); // Handle error
            } finally {
                setLoading(false); // Disable loading once the data is fetched
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        // Handle edit logic here
        console.log('Edit booking with id:', id);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log('Delete booking with id:', id);
        // Optionally remove the accommodation from the list in UI
        setAccommodations(accommodations.filter(booking => booking.id !== id));
    };

    if (loading) {
        return <p>Loading accommodations...</p>; // Show a loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Show an error message
    }

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
                <p>No accommodations available.</p> // Fallback UI if no data
            )}
        </div>
    );
};

export default Accommodation;
