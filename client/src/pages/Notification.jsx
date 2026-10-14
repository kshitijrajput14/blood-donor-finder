import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";

function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);


    // ================================
    // FETCH NOTIFICATIONS
    // ================================

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const donorData =
                    localStorage.getItem("donor");

                const token =
                    localStorage.getItem("donorToken");


                if (!donorData || !token) {

                    navigate("/login");

                    return;
                }


                const donor =
                    JSON.parse(donorData);

                const donorId =
                    donor.id;


                const response = await axios.get(
                    `http://localhost:5000/api/notification/donor/${donorId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                console.log(
                    "NOTIFICATION RESPONSE:",
                    response.data
                );


                setNotifications(
                    response.data.notifications || []
                );


            } catch (error) {

                console.log(
                    "NOTIFICATION ERROR:",
                    error
                );


                if (error.response?.status === 401) {

                    localStorage.removeItem("donor");
                    localStorage.removeItem("donorToken");

                    navigate("/login");
                }


            } finally {

                setLoading(false);

            }

        };


        fetchNotifications();

    }, [navigate]);


    // ================================
    // MARK AS READ
    // ================================

    const markAsRead = async (notificationId) => {

        try {

            const token =
                localStorage.getItem("donorToken");


            await axios.put(
                `http://localhost:5000/api/notification/read/${notificationId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === notificationId
                        ? {
                            ...notification,
                            status: "Read"
                        }
                        : notification
                )
            );


        } catch (error) {

            console.log(
                "MARK READ ERROR:",
                error
            );

            alert("Failed to mark notification as read");

        }

    };


    // ================================
    // ACCEPT / REJECT REQUEST
    // ================================

    const updateRequestStatus = async (
        requestId,
        status
    ) => {

        try {

            const token =
                localStorage.getItem("donorToken");


            if (!token) {

                navigate("/login");

                return;
            }


            const response = await axios.put(
                `http://localhost:5000/api/blood-request/donor-status/${requestId}`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(
                "REQUEST STATUS RESPONSE:",
                response.data
            );


            setNotifications((prev) =>
                prev.map((notification) => {

                    if (
                        notification.bloodRequestId?._id ===
                        requestId
                    ) {

                        return {
                            ...notification,

                            bloodRequestId: {
                                ...notification.bloodRequestId,
                                status: status
                            }
                        };

                    }

                    return notification;

                })
            );


            if (status === "Accepted") {

                alert(
                    "Blood request accepted successfully!"
                );

            } else {

                alert(
                    "Blood request rejected."
                );

            }


        } catch (error) {

            console.log(
                "REQUEST STATUS ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update request status"
            );

        }

    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (
            <div className="notification-page">

                <div className="notification-loading">

                    <p>Loading notifications...</p>

                </div>

            </div>
        );

    }


    // ================================
    // PAGE
    // ================================

    return (

        <div className="notification-page">

            {/* HEADER */}

            <div className="notification-header">

                <div>

                    <p className="notification-label">
                        DONOR PORTAL
                    </p>

                    <h1>
                        Emergency Notifications
                    </h1>

                    <p className="notification-subtitle">
                        View blood requests matching your donor profile.
                    </p>

                </div>


                <button
                    className="back-dashboard-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>

            </div>


            {/* SUMMARY */}

            <div className="notification-summary">

                <div className="notification-summary-card">

                    <span>
                        Total Notifications
                    </span>

                    <strong>
                        {notifications.length}
                    </strong>

                </div>


                <div className="notification-summary-card">

                    <span>
                        Unread
                    </span>

                    <strong>
                        {
                            notifications.filter(
                                (notification) =>
                                    notification.status === "Unread"
                            ).length
                        }
                    </strong>

                </div>


                <div className="notification-summary-card">

                    <span>
                        Pending Requests
                    </span>

                    <strong>
                        {
                            notifications.filter(
                                (notification) =>
                                    notification.bloodRequestId?.status ===
                                    "Pending"
                            ).length
                        }
                    </strong>

                </div>

            </div>


            {/* NOTIFICATIONS */}

            <section className="notification-section">

                <div className="section-heading">

                    <div>

                        <p className="section-label">
                            EMERGENCY REQUESTS
                        </p>

                        <h2>
                            Your Notifications
                        </h2>

                    </div>

                </div>


                {notifications.length === 0 ? (

                    <div className="empty-notifications">

                        <div className="empty-icon">
                            ✓
                        </div>

                        <h3>
                            No emergency notifications
                        </h3>

                        <p>
                            You will receive a notification when a matching blood request is created.
                        </p>

                    </div>

                ) : (

                    <div className="notification-list">

                        {notifications.map(
                            (notification) => {

                                const request =
                                    notification.bloodRequestId;


                                return (

                                    <div
                                        className="notification-card"
                                        key={notification._id}
                                    >

                                        {/* CARD HEADER */}

                                        <div className="notification-card-header">

                                            <div>

                                                <p className="request-type">
                                                    Emergency Blood Request
                                                </p>

                                                <p className="request-message">
                                                    {notification.message}
                                                </p>

                                            </div>


                                            <span
                                                className={`notification-status ${
                                                    notification.status === "Unread"
                                                        ? "unread"
                                                        : "read"
                                                }`}
                                            >
                                                {notification.status}
                                            </span>

                                        </div>


                                        {/* REQUEST DETAILS */}

                                        {request ? (

                                            <div className="request-details-grid">

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
                                                        Blood Group
                                                    </span>

                                                    <strong className="blood-group">
                                                        {request.bloodGroup}
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


                                                <div className="request-detail">

                                                    <span>
                                                        Request Status
                                                    </span>

                                                    <strong
                                                        className={`request-status ${request.status?.toLowerCase()}`}
                                                    >
                                                        {request.status}
                                                    </strong>

                                                </div>

                                            </div>

                                        ) : (

                                            <p className="deleted-request">
                                                This blood request is no longer available.
                                            </p>

                                        )}


                                        {/* ACTIONS */}

                                        <div className="notification-actions">


                                            {notification.status === "Unread" && (

                                                <button
                                                    className="read-button"
                                                    onClick={() =>
                                                        markAsRead(
                                                            notification._id
                                                        )
                                                    }
                                                >
                                                    Mark as Read
                                                </button>

                                            )}


                                            {request?.status === "Pending" && (

                                                <div className="request-action-buttons">

                                                    <button
                                                        className="accept-button"
                                                        onClick={() =>
                                                            updateRequestStatus(
                                                                request._id,
                                                                "Accepted"
                                                            )
                                                        }
                                                    >
                                                        Accept Request
                                                    </button>


                                                    <button
                                                        className="reject-button"
                                                        onClick={() =>
                                                            updateRequestStatus(
                                                                request._id,
                                                                "Rejected"
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

                                            )}


                                            {request?.status === "Accepted" && (

                                                <div className="accepted-message">
                                                    ✓ You accepted this blood request
                                                </div>

                                            )}


                                            {request?.status === "Rejected" && (

                                                <div className="rejected-message">
                                                    Request rejected
                                                </div>

                                            )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </section>

        </div>

    );

}

export default Notifications;