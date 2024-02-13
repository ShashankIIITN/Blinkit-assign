import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"
import axios from "axios";
import UploadImage from './Upload';
import {Buffer} from "buffer";

const URL = process.env.REACT_APP_URL || "http://localhost:5000";

function Home() {

  const [open, setopen] = useState(false);


  const [isLoggedin, setisLoggedin] = useState(false);

  const [imgdata, setimgdata] = useState(null);
  const nav = useNavigate();

  const onClose = () => {
    setopen(false);
  }
  function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, buffer);
    return btoa(binary);
  }
  // function arrayBufferToBase64(buffer, type) {
  //   const blob = new Blob([buffer], { type: type });
  //   const imageUrl = URL.createObjectURL(blob);

  //   return imageUrl;

  // }
  function arrayToUint8Array(array) {
    return new Uint8Array(array);
  }

  // Convert Uint8Array to Blob
  function uint8ArrayToBlob(uint8Array, type) {
    return new Blob([uint8Array], { type: type });
  }

  const fecthImages = async () => {
    try {
      const data = await axios.get(`${URL}/api/fetch-images`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access_token': localStorage.getItem('token')
        }
      });
      console.log(data.data);
      setimgdata(data.data);
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setisLoggedin(true)
      fecthImages();
    }

    console.log(localStorage.getItem('token'));
  }, [open])

  const handlelogout = () => {
    localStorage.removeItem('token');
    setisLoggedin(false);
  }
  return (
    <div className='Main_home'>
      <div className="main_top_section">
        {!isLoggedin ? <ul className='nav'>
          <li onClick={() => nav('/login')}>Login</li>
          <li onClick={() => nav('/signup')}>SignUp</li>
        </ul> :
          <ul className='nav'>
            <button type="button" className='upload' onClick={() => setopen(true)}>Upload Image</button>
            <li onClick={handlelogout}>LogOut</li>
          </ul>}
      </div>
      <div className="Main_Image_Dis">
        <h2>Uploaded Images</h2>
        {!isLoggedin && <h3>Please Login To See the uploaded images!!</h3>}
        {isLoggedin && imgdata && <div className="images">
          {
            imgdata.map((item, index) => {

              if(!item.data) return null;
              const buffer = Buffer.from(item.data?.data);
              const base64ImageData = buffer.toString('base64');
              return <img src={'data:image/jpeg;base64,' + base64ImageData} alt="" srcset="" />
            })
          }
        </div>}
      </div>
      <UploadImage open={open} onClose={onClose} />
    </div>
  )
}

export default Home