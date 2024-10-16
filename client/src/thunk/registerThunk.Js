// Make sure you're importing the 'auth' correctly
import { auth } from '../firebase'; // Adjust path as needed

// Then use auth in your thunk, like:
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const registerUser = (email, password) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(registerSuccess(user));
        alert("User signed up successfully!");
    } catch (error) {
        dispatch(registerFailure(error.message));
        alert("Error signing up: " + error.message);
    }
};
