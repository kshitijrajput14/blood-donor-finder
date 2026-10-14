import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/admin/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            if (response.data.success) {

                localStorage.setItem(
                    "isAdminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminToken",
                    response.data.token
                );

                setMessage("Admin login successful!");

                setTimeout(() => {
                    navigate("/admin-dashboard");
                }, 1000);
            }

        } catch (error) {

            console.log("LOGIN ERROR:", error);

            setMessage(
                "Invalid email or password."
            );
        }
    };

    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-header">

                    <div className="admin-login-icon">
                        A
                    </div>

                    <p className="admin-login-label">
                        ADMIN PORTAL
                    </p>

                    <h1>
                        Admin Login
                    </h1>

                    <p className="admin-login-subtitle">
                        Manage donors and emergency blood requests.
                    </p>

                </div>


                <form
                    className="admin-login-form"
                    onSubmit={handleLogin}
                >

                    <div className="admin-form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        className="admin-login-button"
                        type="submit"
                    >
                        Login to Admin Panel
                    </button>

                </form>


                {message && (

                    <p
                        className={
                            message.includes("successful")
                                ? "admin-success-message"
                                : "admin-error-message"
                        }
                    >
                        {message}
                    </p>

                )}


                <div className="admin-login-footer">

                    <span>
                        Blood Donor Finder
                    </span>

                    <span>
                        Secure Admin Access
                    </span>

                </div>

            </div>

        </div>
    );
}

export default AdminLogin;