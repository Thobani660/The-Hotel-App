// import React, { useState, useEffect } from "react";
// import { auth, db } from "../../firebase";
// import { useNavigate } from "react-router-dom";

// function AdminProfile() {
//   const [adminData, setAdminData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         navigate("/signin");
//         return;
//       }

//       const adminRef = doc(db, "admins", user.uid);
//       const adminDoc = await getDoc(adminRef);
//       if (adminDoc.exists()) {
//         setAdminData(adminDoc.data());
//       } else {
//         console.error("Admin data not found");
//       }
//     };

//     fetchAdminData();
//   }, [auth, db, navigate]);

//   return (
//     <div>
//       <h1>Admin Profile</h1>
//       <p>Welcome, {adminData.email}!</p>

//       <ul>
//         <li>
//           <strong>ID Number:</strong> {adminData.idNumber}
//         </li>
//         <li>
//           <strong>Cellphone Number:</strong> {adminData.cellphone}
//         </li>
//         <li>
//           <strong>Location:</strong> {adminData.location}
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default AdminProfile;