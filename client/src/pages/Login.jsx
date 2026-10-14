import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/donor/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "donor",
                JSON.stringify(response.data.donor)
            );

            localStorage.setItem(
                "donorToken",
                response.data.token
            );

            alert("Login successful!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong.");
            }
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-icon">
                        +
                    </div>

                    <p className="login-label">
                        BLOOD DONOR FINDER
                    </p>

                    <h1>Donor Login</h1>

                    <p>
                        Login to manage your donor profile
                    </p>

                </div>


                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

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
                        className="login-button"
                    >
                        Login
                    </button>

                </form>


                <div className="login-footer">

                    <p>
                        Don't have a donor account?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Register as a Donor
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;