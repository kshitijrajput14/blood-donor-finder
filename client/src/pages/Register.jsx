import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [medicalReport, setMedicalReport] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("bloodGroup", bloodGroup);
            formData.append("city", city);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("medicalReport", medicalReport);

            const response = await axios.post(
                "http://localhost:5000/api/donor/register",
                formData
            );

            console.log(response.data);

            alert(
                "Registration successful! Please wait for admin verification."
            );

            setName("");
            setBloodGroup("");
            setCity("");
            setPhone("");
            setEmail("");
            setPassword("");
            setMedicalReport(null);

            navigate("/login");

        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="register-page">

            <div className="register-container">

                {/* Left information section */}

                <div className="register-info">

                    <p className="register-tag">
                        BLOOD DONOR REGISTRATION
                    </p>

                    <h1>
                        Become a
                        <span> blood donor.</span>
                    </h1>

                    <p className="register-description">
                        Register yourself as a donor and help patients
                        find the blood they need during an emergency.
                    </p>

                    <div className="registration-note">

                        <div className="note-icon">
                            +
                        </div>

                        <div>
                            <h3>Verification required</h3>

                            <p>
                                Your medical report will be reviewed
                                by an administrator before your profile
                                becomes available to patients.
                            </p>
                        </div>

                    </div>

                </div>


                {/* Registration form */}

                <div className="register-card">

                    <div className="form-heading">

                        <h2>Create Donor Account</h2>

                        <p>
                            Enter your details below to register.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-row">

                            <div className="form-group">

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


                            <div className="form-group">

                                <label>Blood Group</label>

                                <select
                                    value={bloodGroup}
                                    onChange={(e) =>
                                        setBloodGroup(e.target.value)
                                    }
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

                            <div className="form-group">

                                <label>City</label>

                                <input
                                    type="text"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) =>
                                        setCity(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

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


                        <div className="form-group">

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


                        <div className="form-group">

                            <label>Medical Report</label>

                            <div className="file-upload">

                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                    onChange={(e) =>
                                        setMedicalReport(
                                            e.target.files[0]
                                        )
                                    }
                                />

                                <p>
                                    Upload PDF, JPG or PNG
                                    medical report
                                </p>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="register-submit"
                        >
                            Create Donor Account
                        </button>

                    </form>


                    <p className="login-text">

                        Already registered?

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </button>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;