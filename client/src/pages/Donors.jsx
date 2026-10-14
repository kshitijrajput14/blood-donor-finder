import { useState, useEffect } from "react";
import axios from "axios";
import "./Donors.css";

function Donors() {

    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get("http://localhost:5000/api/donor/verified")
            .then((response) => {

                console.log("VERIFIED DONORS:", response.data);

                setDonors(response.data.donors || []);
                setLoading(false);

            })
            .catch((error) => {

                console.log("DONOR ERROR:", error);
                setLoading(false);

            });

    }, []);

    return (
        <div className="donors-page">

            <div className="donors-container">

                <div className="donors-header">

                    <div>
                        <p className="donors-label">
                            VERIFIED DONOR NETWORK
                        </p>

                        <h1>Find Blood Donors</h1>

                        <p>
                            Browse verified blood donors available
                            to help in an emergency.
                        </p>
                    </div>

                    <div className="donor-count">
                        <span>Total Verified Donors</span>
                        <strong>{donors.length}</strong>
                    </div>

                </div>

                {loading && (
                    <div className="donors-message">
                        Loading verified donors...
                    </div>
                )}

                {!loading && donors.length === 0 && (
                    <div className="donors-empty">
                        <h3>No verified donors available</h3>

                        <p>
                            There are currently no verified donors
                            registered in the system.
                        </p>
                    </div>
                )}

                {!loading && donors.length > 0 && (
                    <div className="donor-grid">

                        {donors.map((donor) => (

                            <div
                                className="public-donor-card"
                                key={donor._id}
                            >

                                <div className="public-donor-header">

                                    <div className="public-donor-avatar">
                                        {donor.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h3>{donor.name}</h3>

                                        <span className="verified-text">
                                            ✓ Verified Donor
                                        </span>
                                    </div>

                                </div>

                                <div className="blood-group-box">
                                    <span>Blood Group</span>

                                    <strong>
                                        {donor.bloodGroup}
                                    </strong>
                                </div>

                                <div className="public-donor-details">

                                    <div>
                                        <span>City</span>
                                        <strong>{donor.city}</strong>
                                    </div>

                                    <div>
                                        <span>Phone</span>
                                        <strong>{donor.phone}</strong>
                                    </div>

                                </div>

                                <a
                                    href={`tel:${donor.phone}`}
                                    className="contact-donor-btn"
                                >
                                    Contact Donor
                                </a>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Donors;