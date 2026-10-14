import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);


    // Fetch patient's blood requests
    useEffect(() => {
        fetchMyRequests();
    }, []);


    const fetchMyRequests = async () => {

        try {

            const token = localStorage.getItem("patientToken");

            if (!token) {
                console.log("Patient token not found");
                navigate("/patient-login");
                return;
            }


            const response = await axios.get(
                "http://localhost:5000/api/blood-request/my-requests",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(
                "MY REQUESTS:",
                response.data
            );


            setRequests(
                response.data.requests || []
            );


        } catch (error) {

            console.log(
                "GET MY REQUESTS ERROR:",
                error
            );


            if (error.response?.status === 401) {

                localStorage.removeItem("patientToken");
                localStorage.removeItem("patient");

                navigate("/patient-login");

            }

        } finally {

            setLoading(false);

        }
    };


    // Confirm blood received
    const confirmBloodReceived = async (id) => {

        try {

            const token =
                localStorage.getItem("patientToken");


            const response = await axios.put(
                `http://localhost:5000/api/blood-request/patient-confirm/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(
                "CONFIRM RESPONSE:",
                response.data
            );


            alert(
                "Blood received successfully!"
            );


            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id
                        ? {
                            ...request,
                            status: "Fulfilled"
                        }
                        : request
                )
            );


        } catch (error) {

            console.log(
                "CONFIRM BLOOD ERROR:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to confirm blood"
            );

        }
    };


    // Patient logout
    const logout = () => {

        localStorage.removeItem(
            "patientToken"
        );

        localStorage.removeItem(
            "patient"
        );

        navigate("/patient-login");

    };


    return (

        <div className="patient-dashboard">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="patient-dashboard-header">

                <div>

                    <p className="dashboard-label">
                        PATIENT PORTAL
                    </p>

                    <h1>
                        Patient Dashboard
                    </h1>

                    <p className="dashboard-welcome">
                        Manage your blood requests and track their status.
                    </p>

                </div>


                <div className="dashboard-actions">

                    <button
                        className="create-request-button"
                        onClick={() =>
                            navigate("/blood-request")
                        }
                    >
                        + Create Blood Request
                    </button>


                    <button
                        className="patient-logout-button"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* ==============================
                SUMMARY
            ============================== */}

            <div className="patient-summary">

                <div className="summary-card">

                    <span className="summary-label">
                        Total Requests
                    </span>

                    <strong>
                        {requests.length}
                    </strong>

                </div>


                <div className="summary-card">

                    <span className="summary-label">
                        Pending
                    </span>

                    <strong>
                        {
                            requests.filter(
                                (request) =>
                                    request.status === "Pending"
                            ).length
                        }
                    </strong>

                </div>


                <div className="summary-card">

                    <span className="summary-label">
                        Accepted
                    </span>

                    <strong>
                        {
                            requests.filter(
                                (request) =>
                                    request.status === "Accepted"
                            ).length
                        }
                    </strong>

                </div>


                <div className="summary-card">

                    <span className="summary-label">
                        Fulfilled
                    </span>

                    <strong>
                        {
                            requests.filter(
                                (request) =>
                                    request.status === "Fulfilled"
                            ).length
                        }
                    </strong>

                </div>

            </div>


            {/* ==============================
                REQUESTS
            ============================== */}

            <section className="patient-requests-section">

                <div className="requests-heading">

                    <div>

                        <p className="section-label">
                            REQUEST HISTORY
                        </p>

                        <h2>
                            My Blood Requests
                        </h2>

                    </div>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="dashboard-message">

                        <p>
                            Loading your requests...
                        </p>

                    </div>

                )}


                {/* No requests */}

                {!loading &&
                    requests.length === 0 && (

                        <div className="empty-requests">

                            <div className="empty-icon">
                                +
                            </div>

                            <h3>
                                No blood requests yet
                            </h3>

                            <p>
                                Create a blood request when you
                                need help finding a donor.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/blood-request")
                                }
                            >
                                Create Blood Request
                            </button>

                        </div>

                    )}


                {/* Requests */}

                {!loading &&
                    requests.length > 0 && (

                        <div className="request-grid">

                            {requests.map((request) => (

                                <div
                                    className="patient-request-card"
                                    key={request._id}
                                >

                                    {/* Card header */}

                                    <div className="request-card-header">

                                        <div>

                                            <p className="request-title">
                                                Blood Request
                                            </p>

                                            <p className="request-id">
                                                Request ID:{" "}
                                                {request._id.slice(-6)}
                                            </p>

                                        </div>


                                        <span
                                            className={`request-status ${request.status.toLowerCase()}`}
                                        >
                                            {request.status}
                                        </span>

                                    </div>


                                    {/* Blood group */}

                                    <div className="blood-group-section">

                                        <span className="blood-label">
                                            Blood Group
                                        </span>

                                        <strong>
                                            {request.bloodGroup}
                                        </strong>

                                    </div>


                                    {/* Details */}

                                    <div className="request-details">

                                        <div className="request-detail">

                                            <span>
                                                Patient
                                            </span>

                                            <strong>
                                                {request.patientName}
                                            </strong>

                                        </div>


                                        <div className="request-detail">

                                            <span>
                                                City
                                            </span>

                                            <strong>
                                                {request.city}
                                            </strong>

                                        </div>


                                        <div className="request-detail">

                                            <span>
                                                Hospital
                                            </span>

                                            <strong>
                                                {request.hospital}
                                            </strong>

                                        </div>


                                        <div className="request-detail">

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {request.phone}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Accepted */}

                                    {request.status === "Accepted" && (

                                        <div className="accepted-box">

                                            <div>

                                                <strong>
                                                    Donor has accepted your request
                                                </strong>

                                                <p>
                                                    Once you receive the blood,
                                                    confirm it below.
                                                </p>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    confirmBloodReceived(
                                                        request._id
                                                    )
                                                }
                                            >
                                                Blood Received
                                            </button>

                                        </div>

                                    )}


                                    {/* Fulfilled */}

                                    {request.status === "Fulfilled" && (

                                        <div className="fulfilled-box">

                                            <span>
                                                ✓
                                            </span>

                                            <div>

                                                <strong>
                                                    Blood received
                                                </strong>

                                                <p>
                                                    You confirmed that the blood
                                                    was received successfully.
                                                </p>

                                            </div>

                                        </div>

                                    )}


                                    {/* Pending */}

                                    {request.status === "Pending" && (

                                        <div className="pending-box">

                                            <span>
                                                Waiting
                                            </span>

                                            <p>
                                                Waiting for a matching donor
                                                to accept this request.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

            </section>

        </div>
    );
}

export default PatientDashboard;