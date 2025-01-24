/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddressCard = () => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [add1, setAdd1] = useState("");
    const [add2, setAdd2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("");
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            city,
            country,
            address1: add1,
            address2: add2,
            zipCode,
            addressType,
        };
        console.log(addressData);
        const token = localStorage.getItem('token');
        if(!token){
            return alert('Token Missing');
        }
        
        const response = await axios.post(
            `http://localhost:8080/user/add-address?token=${token}`,
            addressData
        );
    navigate('/profile');
  };


  const styles = {
    card: {
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    button: {
      padding: "10px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Address Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address Line 1:</label>
          <input
            type="text"
            value={add1}
            onChange={(e) => setAdd1(e.target.value)}
            placeholder="Enter address line 1"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address Line 2:</label>
          <input
            type="text"
            value={add2}
            onChange={(e) => setAdd2(e.target.value)}
            placeholder="Enter address line 2"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Zip Code:</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter your zip code"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address Type:</label>
          <select
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Address Type</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default AddressCard;