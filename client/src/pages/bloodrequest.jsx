import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BloodRequest.css";

function BloodRequest() {

    const navigate = useNavigate();

    const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        patientName: "",
        bloodGroup: "",
        city: "",
        phone: "",
        hospital: ""
    });

    const [message, setMessage] = useState("");
    const [matchingDonors, setMatchingDonors] = useState([]);


    // Check patient login
    useEffect(() => {

        const token = localStorage.getItem("patientToken");

        if (token) {
            setIsPatientLoggedIn(true);
        }

    }, []);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("patientToken");

            if (!token) {

                setMessage(
                    "Please login as a patient first."
                );

                return;
            }


            const response = await axios.post(
                "http://localhost:5000/api/blood-request/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(
                "BLOOD REQUEST RESPONSE:",
                response.data
            );


            setMessage(
                "Blood request created successfully!"
            );


            const donorResponse = await axios.get(
                `http://localhost:5000/api/donor/matching?bloodGroup=${encodeURIComponent(formData.bloodGroup)}&city=${encodeURIComponent(formData.city)}`
            );


            console.log(
                "MATCHING DONORS:",
                donorResponse.data
            );


            setMatchingDonors(
                donorResponse.data.donors || []
            );


            setFormData({
                patientName: "",
                bloodGroup: "",
                city: "",
                phone: "",
                hospital: ""
            });


        } catch (error) {

            console.log(
                "BLOOD REQUEST ERROR:",
                error
            );

            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );


            setMessage(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };


    return (

        <div className="blood-request-page">

            <div className="blood-request-container">

                <div className="blood-request-header">

                    <p className="blood-request-label">
                        EMERGENCY BLOOD REQUEST
                    </p>

                    <h1>Request Blood</h1>

                    <p>
                        Submit your blood requirement and find
                        matching verified donors in your city.
                    </p>

                </div>


                {/* NOT LOGGED IN */}

                {!isPatientLoggedIn && (

                    <div className="patient-login-required">

                        <div className="login-required-icon">
                            !
                        </div>

                        <h2>Patient Account Required</h2>

                        <p>
                            You need a patient account to create
                            an emergency blood request.
                        </p>

                        <div className="login-required-actions">

                            <button
                                className="patient-login-button"
                                onClick={() =>
                                    navigate("/patient-login")
                                }
                            >
                                Patient Login
                            </button>

                            <button
                                className="patient-register-button"
                                onClick={() =>
                                    navigate("/patient-register")
                                }
                            >
                                Create Patient Account
                            </button>

                        </div>

                    </div>

                )}


                {/* LOGGED IN */}

                {isPatientLoggedIn && (

                    <>

                        <div className="blood-request-card">

                            <form onSubmit={handleSubmit}>

                                <div className="form-row">

                                    <div className="request-form-group">

                                        <label>
                                            Patient Name
                                        </label>

                                        <input
                                            type="text"
                                            name="patientName"
                                            placeholder="Enter patient name"
                                            value={formData.patientName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="request-form-group">

                                        <label>
                                            Blood Group
                                        </label>

                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select blood group
                                            </option>

                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>

                                        </select>

                                    </div>

                                </div>


                                <div className="form-row">

                                    <div className="request-form-group">

                                        <label>
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Enter city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="request-form-group">

                                        <label>
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter contact number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="request-form-group">

                                    <label>
                                        Hospital
                                    </label>

                                    <input
                                        type="text"
                                        name="hospital"
                                        placeholder="Enter hospital name"
                                        value={formData.hospital}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="submit-request-button"
                                >
                                    Submit Blood Request
                                </button>

                            </form>


                            {message && (

                                <div
                                    className={`request-message ${
                                        message.includes("successfully")
                                            ? "success"
                                            : "error"
                                    }`}
                                >
                                    {message}
                                </div>

                            )}

                        </div>


                        {/* MATCHING DONORS */}

                        {matchingDonors.length > 0 && (

                            <div className="matching-donors-section">

                                <div className="matching-header">

                                    <p className="blood-request-label">
                                        VERIFIED MATCHES
                                    </p>

                                    <h2>
                                        Matching Donors
                                    </h2>

                                    <p>
                                        Verified donors matching your
                                        blood group and city.
                                    </p>

                                </div>


                                <div className="matching-donor-grid">

                                    {matchingDonors.map((donor) => (

                                        <div
                                            className="matching-donor-card"
                                            key={donor._id}
                                        >

                                            <div className="donor-card-top">

                                                <div className="donor-avatar">
                                                    {donor.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>

                                                    <h3>
                                                        {donor.name}
                                                    </h3>

                                                    <span>
                                                        Verified Donor
                                                    </span>

                                                </div>

                                            </div>


                                            <div className="donor-card-details">

                                                <div>

                                                    <small>
                                                        Blood Group
                                                    </small>

                                                    <strong>
                                                        {donor.bloodGroup}
                                                    </strong>

                                                </div>


                                                <div>

                                                    <small>
                                                        City
                                                    </small>

                                                    <strong>
                                                        {donor.city}
                                                    </strong>

                                                </div>


                                                <div>

                                                    <small>
                                                        Phone
                                                    </small>

                                                    <strong>
                                                        {donor.phone}
                                                    </strong>

                                                </div>

                                            </div>


                                            <a
                                                href={`tel:${donor.phone}`}
                                                className="contact-donor-button"
                                            >
                                                Contact Donor
                                            </a>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}


                        {message ===
                            "Blood request created successfully!" &&
                            matchingDonors.length === 0 && (

                                <div className="no-donors-box">

                                    <h3>
                                        No matching donors found
                                    </h3>

                                    <p>
                                        We couldn't find a verified donor
                                        matching this blood group and city.
                                    </p>

                                </div>

                            )}

                    </>

                )}

            </div>

        </div>

    );

}

export default BloodRequest;