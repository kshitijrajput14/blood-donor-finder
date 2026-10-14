import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [donors, setDonors] = useState([]);
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        axios.get(
            "http://localhost:5000/api/donor/all",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            console.log("DONORS:", response.data);
            setDonors(response.data.donors);
        })
        .catch((error) => {
            console.log("DONOR ERROR:", error);
        });


        axios.get(
            "http://localhost:5000/api/blood-request/all",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            console.log("REQUESTS:", response.data);
            setRequests(response.data.requests);
        })
        .catch((error) => {
            console.log("REQUEST ERROR:", error);
        });

    }, [navigate]);


    const pendingRequests = requests.filter(
        (request) => request.status === "Pending"
    );


    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("adminToken");

            const response = await axios.put(
                `http://localhost:5000/api/blood-request/update-status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id
                        ? {
                            ...request,
                            status: response.data.request.status
                        }
                        : request
                )
            );

            alert(`Request ${status} successfully`);

        } catch (error) {

            console.log("UPDATE STATUS ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update request status"
            );
        }
    };


    const verifyDonor = async (id) => {

        try {

            const token = localStorage.getItem("adminToken");

            const response = await axios.put(
                `http://localhost:5000/api/donor/verify/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("VERIFY RESPONSE:", response.data);

            setDonors((prevDonors) =>
                prevDonors.map((donor) =>
                    donor._id === id
                        ? {
                            ...donor,
                            verified: true,
                            verificationStatus: "Verified"
                        }
                        : donor
                )
            );

            alert("Donor verified successfully!");

        } catch (error) {

            console.log("VERIFY ERROR:", error);
        }
    };


    const rejectDonor = async (id) => {

        try {

            const token = localStorage.getItem("adminToken");

            const response = await axios.put(
                `http://localhost:5000/api/donor/reject/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("REJECT RESPONSE:", response.data);

            setDonors((prevDonors) =>
                prevDonors.map((donor) =>
                    donor._id === id
                        ? {
                            ...donor,
                            verified: false,
                            verificationStatus: "Rejected"
                        }
                        : donor
                )
            );

            alert("Donor rejected successfully!");

        } catch (error) {

            console.log("REJECT ERROR:", error);
        }
    };


    const handleViewReport = (filePath) => {

        const fileName = filePath
            .split(/[\\/]/)
            .pop();

        window.open(
            `http://localhost:5000/uploads/${fileName}`,
            "_blank"
        );
    };


    const handleLogout = () => {

        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("adminToken");

        navigate("/admin-login");
    };


    return (

        <div className="admin-dashboard">

            {/* HEADER */}

            <header className="dashboard-header">

                <div className="dashboard-header-content">

                    <div>
                        <p className="dashboard-label">
                            ADMIN PORTAL
                        </p>

                        <h1 className="dashboard-title">
                            Admin Dashboard
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage donors and monitor emergency blood requests.
                        </p>
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            <main className="admin-dashboard-content">

                {/* WELCOME */}

                <div className="welcome-section">

                    <h2>
                        Welcome, Admin
                    </h2>

                    <p>
                        Review donor verification and manage blood requests.
                    </p>

                </div>


                {/* STATISTICS */}

                <section className="statistics-section">

                    <div className="section-header">

                        <div>
                            <p className="section-label">
                                OVERVIEW
                            </p>

                            <h2 className="section-title">
                                Dashboard Statistics
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-stats">

                        <div className="stat-card">

                            <div className="stat-icon donor-stat-icon">
                                D
                            </div>

                            <div className="stat-content">

                                <span className="stat-label">
                                    Total Donors
                                </span>

                                <strong className="stat-number">
                                    {donors.length}
                                </strong>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon request-stat-icon">
                                R
                            </div>

                            <div className="stat-content">

                                <span className="stat-label">
                                    Blood Requests
                                </span>

                                <strong className="stat-number">
                                    {requests.length}
                                </strong>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon pending-stat-icon">
                                P
                            </div>

                            <div className="stat-content">

                                <span className="stat-label">
                                    Pending Requests
                                </span>

                                <strong className="stat-number">
                                    {pendingRequests.length}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* DONOR VERIFICATION */}

                <section className="admin-section">

                    <div className="section-header">

                        <div>

                            <p className="section-label">
                                DONOR MANAGEMENT
                            </p>

                            <h2 className="section-title">
                                Donor Verification
                            </h2>

                            <p className="section-subtitle">
                                Review medical reports and verify registered donors.
                            </p>

                        </div>

                        <span className="section-count">
                            {donors.length} Donors
                        </span>

                    </div>


                    {donors.length === 0 ? (

                        <div className="empty-state">
                            <h3>No donors found</h3>
                            <p>
                                Registered donors will appear here.
                            </p>
                        </div>

                    ) : (

                        <div className="donor-grid">

                            {donors.map((donor) => (

                                <div
                                    className="donor-card"
                                    key={donor._id}
                                >

                                    <div className="donor-card-header">

                                        <div className="donor-avatar">
                                            {donor.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="donor-info">

                                            <h3 className="donor-name">
                                                {donor.name}
                                            </h3>

                                            <p className="donor-email">
                                                {donor.email}
                                            </p>

                                        </div>

                                        <span className="blood-group-badge">
                                            {donor.bloodGroup}
                                        </span>

                                    </div>


                                    <div className="donor-details">

                                        <div className="detail-item">

                                            <span className="detail-label">
                                                City
                                            </span>

                                            <strong className="detail-value">
                                                {donor.city}
                                            </strong>

                                        </div>


                                        <div className="detail-item">

                                            <span className="detail-label">
                                                Phone
                                            </span>

                                            <strong className="detail-value">
                                                {donor.phone}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* MEDICAL REPORT */}

                                    <div className="medical-report-box">

                                        <div>

                                            <span className="report-label">
                                                MEDICAL REPORT
                                            </span>

                                            {donor.medicalReport ? (

                                                <p className="report-file-name">
                                                    {donor.medicalReport.fileName}
                                                </p>

                                            ) : (

                                                <p className="no-report">
                                                    No report uploaded
                                                </p>

                                            )}

                                        </div>


                                        {donor.medicalReport && (

                                            <button
                                                className="report-button"
                                                onClick={() =>
                                                    handleViewReport(
                                                        donor.medicalReport.filePath
                                                    )
                                                }
                                            >
                                                View Report
                                            </button>

                                        )}

                                    </div>


                                    {/* STATUS */}

                                    <div className="donor-card-footer">

                                        <div className="verification-status">

                                            <span className="detail-label">
                                                Verification
                                            </span>

                                            {donor.verificationStatus === "Verified" ? (

                                                <span className="status-badge verified">
                                                    Verified
                                                </span>

                                            ) : donor.verificationStatus === "Rejected" ? (

                                                <span className="status-badge rejected">
                                                    Rejected
                                                </span>

                                            ) : (

                                                <span className="status-badge pending">
                                                    Pending
                                                </span>

                                            )}

                                        </div>


                                        {donor.medicalReport && (

                                            <div className="donor-actions">

                                                {donor.verificationStatus !== "Verified" && (

                                                    <button
                                                        className="verify-button"
                                                        onClick={() =>
                                                            verifyDonor(
                                                                donor._id
                                                            )
                                                        }
                                                    >
                                                        Verify
                                                    </button>

                                                )}


                                                {donor.verificationStatus !== "Rejected" && (

                                                    <button
                                                        className="reject-button"
                                                        onClick={() =>
                                                            rejectDonor(
                                                                donor._id
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* BLOOD REQUESTS */}

                <section className="admin-section">

                    <div className="section-header">

                        <div>

                            <p className="section-label">
                                EMERGENCY REQUESTS
                            </p>

                            <h2 className="section-title">
                                Blood Requests
                            </h2>

                            <p className="section-subtitle">
                                Review and manage patient blood requests.
                            </p>

                        </div>

                        <span className="section-count">
                            {requests.length} Requests
                        </span>

                    </div>


                    {requests.length === 0 ? (

                        <div className="empty-state">
                            <h3>No blood requests</h3>

                            <p>
                                Emergency requests will appear here.
                            </p>
                        </div>

                    ) : (

                        <div className="request-grid">

                            {requests.map((request) => (

                                <div
                                    className="admin-request-card"
                                    key={request._id}
                                >

                                    <div className="request-card-header">

                                        <div>

                                            <p className="request-card-label">
                                                BLOOD REQUEST
                                            </p>

                                            <h3>
                                                {request.patientName}
                                            </h3>

                                        </div>

                                        <span
                                            className={`request-status ${request.status.toLowerCase()}`}
                                        >
                                            {request.status}
                                        </span>

                                    </div>


                                    <div className="request-blood-group">

                                        <span>
                                            Required Blood Group
                                        </span>

                                        <strong>
                                            {request.bloodGroup}
                                        </strong>

                                    </div>


                                    <div className="request-details-grid">

                                        <div>

                                            <span>
                                                City
                                            </span>

                                            <strong>
                                                {request.city}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Hospital
                                            </span>

                                            <strong>
                                                {request.hospital}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {request.phone}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="request-card-footer">

                                        {request.status === "Pending" && (

                                            <button
                                                className="accept-request-button"
                                                onClick={() =>
                                                    updateStatus(
                                                        request._id,
                                                        "Accepted"
                                                    )
                                                }
                                            >
                                                Accept Request
                                            </button>

                                        )}


                                        {request.status === "Accepted" && (

                                            <p className="request-info-message accepted-message">
                                                Waiting for patient to confirm blood received.
                                            </p>

                                        )}


                                        {request.status === "Fulfilled" && (

                                            <p className="request-info-message fulfilled-message">
                                                Blood received — confirmed by patient.
                                            </p>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;