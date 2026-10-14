import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientRegister.css";

function PatientRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/patient/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

            console.log("REDIRECTING NOW");

            alert("Patient registered successfully!");

            navigate("/patient-login");

        } catch (error) {
            console.log("REGISTER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="patient-register-page">

            <div className="patient-register-card">

                {/* Header */}
                <div className="patient-register-header">

                    <div className="patient-register-icon">
                        +
                    </div>

                    <p className="patient-register-label">
                        BLOOD DONOR FINDER
                    </p>

                    <h1>Patient Registration</h1>

                    <p>
                        Create an account to request blood during an emergency
                    </p>

                </div>


                {/* Form */}
                <form
                    className="patient-register-form"
                    onSubmit={handleRegister}
                >

                    <div className="patient-form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="patient-form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="patient-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="patient-register-button"
                    >
                        Create Patient Account
                    </button>

                </form>


                {/* Footer */}
                <div className="patient-register-footer">

                    <p>
                        Already have a patient account?
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/patient-login")
                        }
                    >
                        Login as Patient
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PatientRegister;