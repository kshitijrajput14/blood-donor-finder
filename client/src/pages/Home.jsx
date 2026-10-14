import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">

            {/* Hero Section */}
            <section className="home-hero">

                <div className="hero-content">

                    <div className="hero-tag">
                        BLOOD DONOR FINDER
                    </div>

                    <h1>
                        Give Blood.
                        <span> Save a Life.</span>
                    </h1>

                    <p className="hero-description">
                        Find verified blood donors quickly or register
                        yourself as a donor and help someone during an
                        emergency.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-button"
                        >
                            Register as Donor
                        </Link>

                        <Link
                            to="/search"
                            className="secondary-button"
                        >
                            Find a Donor
                        </Link>

                    </div>

                </div>


                {/* Small feature cards */}
                <div className="hero-features">

                    <div className="feature-card">
                        <div className="feature-icon">+</div>

                        <div>
                            <h3>Verified Donors</h3>
                            <p>Trusted donor profiles</p>
                        </div>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">✓</div>

                        <div>
                            <h3>Quick Search</h3>
                            <p>Find donors by city</p>
                        </div>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">24</div>

                        <div>
                            <h3>Emergency Support</h3>
                            <p>Connect when needed</p>
                        </div>
                    </div>

                </div>

            </section>


            {/* How It Works */}
            <section className="home-info">

                <div className="info-heading">

                    <p>HOW IT WORKS</p>

                    <h2>
                        Simple steps to connect people with blood donors
                    </h2>

                </div>


                <div className="info-cards">

                    <div className="info-card">

                        <span className="info-number">
                            01
                        </span>

                        <h3>Register</h3>

                        <p>
                            Register as a donor and submit your
                            medical report for verification.
                        </p>

                    </div>


                    <div className="info-card">

                        <span className="info-number">
                            02
                        </span>

                        <h3>Search</h3>

                        <p>
                            Search for verified donors using
                            blood group and city.
                        </p>

                    </div>


                    <div className="info-card">

                        <span className="info-number">
                            03
                        </span>

                        <h3>Connect</h3>

                        <p>
                            Contact a matching donor when
                            blood is required.
                        </p>

                    </div>

                </div>

            </section>


            {/* Admin */}
            <section className="admin-section">

                <div>
                    <h3>Administrator Access</h3>

                    <p>
                        Manage donors, verification and blood requests.
                    </p>
                </div>

                <Link
                    to="/admin-login"
                    className="admin-button"
                >
                    Admin Login
                </Link>

            </section>

        </div>
    );
}

export default Home;