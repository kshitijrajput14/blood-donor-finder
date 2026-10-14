import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {

    const navigate = useNavigate();

    const donor = JSON.parse(localStorage.getItem("donor"));

    const [name, setName] = useState(donor?.name || "");
    const [bloodGroup, setBloodGroup] = useState(donor?.bloodGroup || "");
    const [city, setCity] = useState(donor?.city || "");
    const [phone, setPhone] = useState(donor?.phone || "");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `http://localhost:5000/api/donor/update/${donor.id}`,
                {
                    name,
                    bloodGroup,
                    city,
                    phone
                }
            );

            console.log(response.data);

            // Update localStorage
            localStorage.setItem(
                "donor",
                JSON.stringify({
                    ...donor,
                    name,
                    bloodGroup,
                    city,
                    phone
                })
            );

            alert("Profile updated successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.log("UPDATE PROFILE ERROR:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong.");
            }
        }
    };

    if (!donor) {
        return (
            <div>
                <h2>Please login first</h2>

                <button onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div>

            <h1>✏️ Edit Profile</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Blood Group</label>
                    <input
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Update Profile
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default EditProfile;