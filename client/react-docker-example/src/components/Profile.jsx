import { Link } from "react-router-dom";

import Cookies from "js-cookie";

function Profile() {
  const userFirstName = Cookies.get("firstName");
  const userEmail = Cookies.get("username");
  return (
    <div
      className="profile"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        padding: " 3px 10px",
        margin: 0,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#26262d",
        color: "white",
        boxShadow: "2px 2px 5px 1px #1d1c20",
        borderRadius: "20px 0",
      }}
    >
      <div
        className="profile__info"
        style={{
          marginRight: " 20px",
        }}
      >
        <h4
          style={{
            margin: 0,
          }}
        >
          {userFirstName}
        </h4>
        <h6>{userEmail}</h6>
      </div>
      <Link
        to="/login"
        className="logout"
        style={{}}
        onClick={() => {
          Object.keys(Cookies.get()).forEach(function (cookieName) {
            var neededAttributes = {
              // Here you pass the same attributes that were used when the cookie was created
              // and are required when removing the cookie
            };
            Cookies.remove(cookieName, neededAttributes);
          });
        }}
      >
        Logout
      </Link>
    </div>
  );
}

export default Profile;
