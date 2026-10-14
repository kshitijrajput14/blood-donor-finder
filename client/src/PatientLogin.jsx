import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientLogin.css";

function PatientLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/patient/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "patientToken",
                response.data.token
            );

            localStorage.setItem(
                "patient",
                JSON.stringify(response.data.patient)
            );

            alert("Patient login successful!");

            navigate("/patient-dashboard");

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="patient-login-page">

            <div className="patient-login-card">

                <div className="patient-login-header">

                    <div className="patient-login-icon">
                        +
                    </div>

                    <p className="patient-login-label">
                        BLOOD DONOR FINDER
                    </p>

                    <h1>Patient Login</h1>

                    <p>
                        Login to manage your blood requests
                    </p>

                </div>


                <form
                    className="patient-login-form"
                    onSubmit={handleLogin}
                >

                    <div className="patient-login-group">

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


                    <div className="patient-login-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="patient-login-button"
                    >
                        Login
                    </button>

                </form>


                <div className="patient-login-footer">

                    <p>
                        Don't have a patient account?
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/patient-register")
                        }
                    >
                        Register as Patient
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PatientLogin;