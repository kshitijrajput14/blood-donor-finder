import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const donor = JSON.parse(localStorage.getItem("donor"));

    const handleLogout = () => {
        localStorage.removeItem("donor");
        localStorage.removeItem("donorToken");

        navigate("/login");
    };

    if (!donor) {
        return (
            <div className="dashboard-login-required">

                <div className="login-required-card">

                    <div className="login-required-icon">
                        !
                    </div>

                    <h2>Donor Login Required</h2>

                    <p>
                        Please login to access your donor dashboard.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                    >
                        Go to Donor Login
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="donor-dashboard">

            {/* Header */}

            <div className="donor-dashboard-header">

                <div>
                    <p className="dashboard-label">
                        DONOR PORTAL
                    </p>

                    <h1>Donor Dashboard</h1>

                    <p className="dashboard-welcome">
                        Manage your donor profile and respond to blood requests.
                    </p>
                </div>

                <button
                    className="donor-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>


            {/* Profile */}

            <div className="donor-profile-card">

                <div className="donor-profile-avatar">
                    {donor.name?.charAt(0).toUpperCase()}
                </div>

                <div className="donor-profile-info">

                    <h2>{donor.name}</h2>

                    <p>{donor.email}</p>

                    <span className="verified-badge">
                        ✓ Verified Donor
                    </span>

                </div>

            </div>


            {/* Information */}

            <section className="donor-information-section">

                <div className="section-heading">

                    <p className="section-label">
                        PROFILE INFORMATION
                    </p>

                    <h2>My Donor Information</h2>

                </div>


                <div className="donor-info-grid">

                    <div className="donor-info-card">

                        <span className="info-card-label">
                            Blood Group
                        </span>

                        <strong className="blood-group-value">
                            {donor.bloodGroup}
                        </strong>

                    </div>


                    <div className="donor-info-card">

                        <span className="info-card-label">
                            City
                        </span>

                        <strong>
                            {donor.city}
                        </strong>

                    </div>


                    <div className="donor-info-card">

                        <span className="info-card-label">
                            Phone
                        </span>

                        <strong>
                            {donor.phone}
                        </strong>

                    </div>


                    <div className="donor-info-card">

                        <span className="info-card-label">
                            Account Status
                        </span>

                        <strong className="status-value">
                            ✓ Verified
                        </strong>

                    </div>

                </div>

            </section>


            {/* Quick Actions */}

            <section className="quick-actions-section">

                <div className="section-heading">

                    <p className="section-label">
                        QUICK ACTIONS
                    </p>

                    <h2>Manage Your Account</h2>

                </div>


                <div className="quick-actions-grid">

                    <button
                        className="dashboard-action-card"
                        onClick={() => navigate("/Notification")}
                    >

                        <span className="action-icon notification-icon">
                            !
                        </span>

                        <div>

                            <strong>
                                Notifications
                            </strong>

                            <p>
                                View blood requests from patients
                            </p>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </button>


                    <button
                        className="dashboard-action-card"
                        onClick={() => navigate("/edit-profile")}
                    >

                        <span className="action-icon edit-icon">
                            ✎
                        </span>

                        <div>

                            <strong>
                                Edit Profile
                            </strong>

                            <p>
                                Update your donor information
                            </p>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </button>


                    <button
                        className="dashboard-action-card"
                        onClick={() => navigate("/search")}
                    >

                        <span className="action-icon search-icon">
                            ⌕
                        </span>

                        <div>

                            <strong>
                                Find Donors
                            </strong>

                            <p>
                                Search the donor network
                            </p>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </button>

                </div>

            </section>


            {/* Donor responsibility */}

            <div className="donor-note">

                <div className="donor-note-icon">
                    ✓
                </div>

                <div>

                    <strong>
                        Thank you for being a blood donor
                    </strong>

                    <p>
                        Your availability can help someone during
                        an emergency. Check your notifications regularly
                        for matching blood requests.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;