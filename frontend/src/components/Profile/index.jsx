// Profile.jsx
import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState([]);

  const fetchUser = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "profile/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "profile/upload", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        fetchUser();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex margin column gap">
      <div className="flex column gap">
        <div>
          <input hidden type="file" id="upload_Image" onChange={uploadImage} />
        </div>
      </div>
      <div className="user-name">
        {user && <h1>{user.fname + " " + user.lname}</h1>}
      </div>
    </div>
  );
}

export default Profile;
