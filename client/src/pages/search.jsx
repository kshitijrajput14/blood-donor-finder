import { useState } from "react";
import axios from "axios";
import "./Search.css";

function Search() {

    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [donors, setDonors] = useState([]);
    const [message, setMessage] = useState("");

    const handleSearch = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.get(
                `http://localhost:5000/api/donor/search?bloodGroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`
            );

            console.log("SEARCH RESULTS:", response.data);

            setDonors(response.data.donors || []);

            if (response.data.donors?.length === 0) {
                setMessage("No matching donors found.");
            } else {
                setMessage("");
            }

        } catch (error) {

            console.log("SEARCH ERROR:", error);

            setDonors([]);

            setMessage(
                error.response?.data?.message ||
                "Unable to search donors."
            );
        }
    };

    return (

        <div className="search-page">

            <div className="search-container">

                {/* HEADER */}

                <div className="search-header">

                    <p className="search-label">
                        DONOR NETWORK
                    </p>

                    <h1>
                        Find a Blood Donor
                    </h1>

                    <p>
                        Search verified donors by blood group and city.
                    </p>

                </div>


                {/* SEARCH BOX */}

                <div className="search-card">

                    <form
                        className="search-form"
                        onSubmit={handleSearch}
                    >

                        <div className="search-field">

                            <label>
                                Blood Group
                            </label>

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


                        <div className="search-field">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) =>
                                    setCity(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            className="search-button"
                            type="submit"
                        >
                            Search Donors
                        </button>

                    </form>

                </div>


                {/* RESULTS */}

                <div className="results-section">

                    <div className="results-header">

                        <div>

                            <p className="search-label">
                                SEARCH RESULTS
                            </p>

                            <h2>
                                Available Donors
                            </h2>

                        </div>

                        {donors.length > 0 && (

                            <span className="results-count">
                                {donors.length} donor
                                {donors.length !== 1 ? "s" : ""}
                            </span>

                        )}

                    </div>


                    {message && donors.length === 0 && (

                        <div className="search-message">
                            {message}
                        </div>

                    )}


                    {donors.length > 0 && (

                        <div className="search-donor-grid">

                            {donors.map((donor) => (

                                <div
                                    className="search-donor-card"
                                    key={donor._id}
                                >

                                    <div className="search-donor-top">

                                        <div className="search-donor-avatar">
                                            {donor.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="search-donor-name">

                                            <h3>
                                                {donor.name}
                                            </h3>

                                            <span>
                                                Verified Donor
                                            </span>

                                        </div>

                                        <div className="search-blood-badge">
                                            {donor.bloodGroup}
                                        </div>

                                    </div>


                                    <div className="search-donor-details">

                                        <div className="search-detail">

                                            <span>
                                                City
                                            </span>

                                            <strong>
                                                {donor.city}
                                            </strong>

                                        </div>


                                        <div className="search-detail">

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {donor.phone}
                                            </strong>

                                        </div>

                                    </div>


                                    <a
                                        className="contact-donor-button"
                                        href={`tel:${donor.phone}`}
                                    >
                                        Contact Donor
                                    </a>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Search;