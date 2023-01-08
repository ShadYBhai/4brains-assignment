import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/loggedUser";
import { BASE_URL } from "../api";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    const loginFlag = JSON.parse(localStorage.getItem("userInfo"));
    console.log(loginFlag);
    dispatch(logout());

    if (loginFlag == null) history("/login");
  };
  let loginFlag = JSON.parse(localStorage.getItem("userInfo"));

  let videoRef = useRef(null);

  let photoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;

        video.srcObject = stream;

        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const takePic = () => {
    let width = 500;
    let height = width / (16 / 9);

    let photo = photoRef.current;

    let video = videoRef.current;

    photo.width = width;

    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, photo.width, photo.height);
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef, photoRef]);

  console.log(photoRef);

  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/save-img`, photoRef);
  };

  return (
    <div className="container">
      <video className="container" ref={videoRef}></video>
      <button onSubmit={handleSubmit} onClick={takePic}>
        Take picture and save
      </button>
      <canvas ref={photoRef}></canvas>
      <button onClick={handleLogout} className="logout">
        LOGOUT
      </button>
    </div>
  );
};

export default HomeScreen;
