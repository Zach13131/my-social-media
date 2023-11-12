import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import { useState } from "react";
import Cookies from "js-cookie";
import api from "./../config/axiosRefreshToken";

import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();

  const [postHeader, setPostHeader] = useState("");

  const [postDescr, setPostDescr] = useState("");

  const [postImageUrl, setPostImgUrl] = useState("");
  const [previewPostImageUrl, setPreviewPostImageUrl] = useState("");

  const accessToken = Cookies.get("accesToken");

  const AddPost = (e) => {
    e.preventDefault();

    api({
      method: "post",
      url: "/addPost",
      data: {
        postHeader,
        postDescr,
        postImageUrl,
      },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        console.log(res);

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const url = event.target.value;
    setPostImgUrl(url);
    setPreviewPostImageUrl(url);
    setError(false);
  };

  const handleImageError = () => {
    setPostImgUrl(
      "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    );
    setError(true);
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            "linear-gradient(rgb(29 41 63), rgb(34 89 129), rgb(57 40 87))",
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: "95%" }}>
          <h2 className="mb-3 text-primary">Post Info</h2>
          <form onSubmit={AddPost}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Header</strong>
              </label>
              <input
                type="text"
                placeholder="Post header"
                className="form-control"
                id="exampleInputname"
                onChange={(e) => setPostHeader(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Description</strong>
              </label>
              <input
                type="text"
                placeholder="Enter EmailPOst description"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setPostDescr(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>ImgUrl</strong>
              </label>
              <input
                type="text"
                placeholder="Post image url"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleInputChange}
                onError={handleImageError}
                required
                style={{
                  marginBottom: "20px",
                  borderRadius: "20px",
                  boxShadow: "4px 4px 11px 2px #000000bd",
                }}
              />

              {error ? (
                <p>Error loading image</p>
              ) : (
                <img
                  style={{
                    width: "400px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={previewPostImageUrl}
                  alt="Preview"
                  onError={handleImageError}
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Add post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
