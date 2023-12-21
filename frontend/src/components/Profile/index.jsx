import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
function Profile() {
  const [user, setUser] = useState([]);
  const fetchUser = () => {
    axios
      .get("http://localhost:3000/profile/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with status code:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios
      .post("http://localhost:3000/profile/upload", formData, {
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
          {user && (
            <img
              className="user-image"
              src={`http://localhost:3000/images/${user?.image}`}
              alt=""
            />
          )}
        </div>
        <div>
          <input hidden type="file" id="upload_Image" onChange={uploadImage} />
          <button
            className="btn"
            onClick={() => {
              document.getElementById("upload_Image").click();
            }}
          >
            Change Image
          </button>
        </div>
      </div>
      <div className="user-name">
        {user && <h1>{user.fname + " " + user.lname}</h1>}
      </div>
    </div>
  );
}

export default Profile;
