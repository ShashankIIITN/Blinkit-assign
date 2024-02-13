import React, { useState } from 'react';
import axios from 'axios';
import "./UploadModal.css"
import ReactDom from 'react-dom';

const URL = process.env.REACT_APP_URL || "http://localhost:5000";

function UploadImage({ open, onClose }) {


    const [image, setImage] = useState(null);

    if (!open) return null;
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        try {
            await axios.post(`${URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'access_token': localStorage.getItem('token')
                }
            });
            alert('Image uploaded successfully');
            onClose();
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        }
    };

    return ReactDom.createPortal(
        <>
            <div className='overlay'></div>
            <div className='modal'>
                <span className='close' onClick={onClose}>x</span>
                <h2>Upload Image</h2>
                <form onSubmit={handleSubmit}>
                    {/* <label className='customlabel'> */}
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                        {/* Select
                    </label> */}
                    <button type="submit">Upload</button>
                </form>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default UploadImage;
