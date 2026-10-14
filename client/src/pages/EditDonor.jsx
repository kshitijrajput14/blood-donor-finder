import axios from "axios";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDonor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

   const handleUpdate = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.put(
            `http://localhost:5000/api/donor/update/${id}`,
            {
                name,
                bloodGroup,
                city,
                phone
            }
        );

        console.log(response.data);

        navigate("/donors");

    } catch (error) {

        console.log("UPDATE ERROR:", error);

    }
};

    return (
        <div className="edit-page">

            <h2>Edit Donor</h2>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter blood group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">
                    Update
                </button>

            </form>

        </div>
    );
}

export default EditDonor;
