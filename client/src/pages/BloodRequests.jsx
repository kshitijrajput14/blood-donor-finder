import { useState, useEffect } from "react";
import axios from "axios";
import "./BloodRequests.css";

function BloodRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(
            "http://localhost:5000/api/blood-request/public"
        )
            .then((response) => {

                console.log(
                    "PUBLIC BLOOD REQUESTS:",
                    response.data
                );

                setRequests(
                    response.data.requests || []
                );

                setLoading(false);

            })
            .catch((error) => {

                console.log(
                    "PUBLIC BLOOD REQUEST ERROR:",
                    error
                );

                setLoading(false);

            });

    }, []);

    return (
        <div className="blood-requests-page">

            <div className="blood-requests-container">

                <div className="blood-requests-header">

                    <div>
                        <p className="blood-requests-label">
                            EMERGENCY BLOOD NETWORK
                        </p>

                        <h1>Blood Requests</h1>

                        <p>
                            View active blood requests from people
                            currently looking for help.
                        </p>
                    </div>

                    <div className="request-count">

                        <span>Active Requests</span>

                        <strong>
                            {requests.length}
                        </strong>

                    </div>

                </div>


                {loading && (
                    <div className="requests-message">
                        Loading blood requests...
                    </div>
                )}


                {!loading && requests.length === 0 && (
                    <div className="requests-empty">

                        <h3>No active blood requests</h3>

                        <p>
                            There are currently no pending or accepted
                            blood requests.
                        </p>

                    </div>
                )}


                {!loading && requests.length > 0 && (

                    <div className="public-request-grid">

                        {requests.map((request) => (

                            <div
                                className="public-request-card"
                                key={request._id}
                            >

                                <div className="public-request-top">

                                    <div>

                                        <p className="request-title">
                                            Blood Required
                                        </p>

                                        <span className="request-id">
                                            Request #{request._id.slice(-6)}
                                        </span>

                                    </div>


                                    <span
                                        className={`public-request-status ${request.status.toLowerCase()}`}
                                    >
                                        {request.status}
                                    </span>

                                </div>


                                <div className="blood-required">

                                    <span>
                                        Blood Group
                                    </span>

                                    <strong>
                                        {request.bloodGroup}
                                    </strong>

                                </div>


                                <div className="public-request-details">

                                    <div>
                                        <span>Patient</span>
                                        <strong>
                                            {request.patientName}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>City</span>
                                        <strong>
                                            {request.city}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Hospital</span>
                                        <strong>
                                            {request.hospital}
                                        </strong>
                                    </div>

                                </div>


                                <div className="request-note">

                                    <span>
                                        Emergency requirement
                                    </span>

                                    <p>
                                        Matching verified donors
                                        can respond to this request.
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default BloodRequests;