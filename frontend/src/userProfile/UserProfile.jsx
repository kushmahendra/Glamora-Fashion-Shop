"use client"

import { useState } from "react"

import Orders from "./Orders";
import WishList from "./WishList";
import Addresses from "./Addresses";
import Profile from "./Profile";
import { Upload } from 'lucide-react';

import { uploadProfileImage } from '../services/services';

export default function UserProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    image:null
  })
  const [activeComponent, setActiveComponent] = useState('profile'); 

    const [imagePreview, setImagePreview] = useState(null); // Store image preview
    const [uploading, setUploading] = useState(false); // Upload state
  
// Handle Image Upload
const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setUploading(true); // Start upload state
    try {
      const result = await uploadProfileImage(file);
      console.log('Image uploaded:', result);

      setFormData((prevData) => ({
        ...prevData,
        image: result,
      }));
      setImagePreview(result);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false); // End upload state
    }
  }
};

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <Orders/>;
      case 'wishList':
        return <WishList/>;
      case 'addresses':
        return <Addresses/>;
      default:
        return <Profile/>;
    }
  };

  return (<>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-200 rounded-full overflow-hidden mb-4">
                {/* <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                /> */}
                 
                            <label htmlFor="file-upload" className="cursor-pointer">
                              {imagePreview ? (
                                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg border border-gray-200">
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ) : (
                                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                                  <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                              <p className="text-sm text-gray-500">
                                {imagePreview ? 'Change Image' : 'Upload Image'}
                              </p>
                            </label>
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                  </div>
          
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500 mb-6">Member since 2024</p>
            </div>

        {/* Main */}
            <nav className="space-y-2 grid grid-cols-1 gap-4">
              <button onClick={() => setActiveComponent('profile')}  className="flex items-center px-4 py-2 text-gray-600 
              hover:text-green-800 hover:bg-yellow-100  rounded-md">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                    Profile
                 </button>
          
               <button onClick={() => setActiveComponent('orders')} className="flex items-center px-4 py-2 text-gray-600   hover:text-green-800 hover:bg-yellow-100 rounded-md">
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                   </svg> 
                    Orders
               </button>
                
               <button onClick={() => setActiveComponent('wishList')}  className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100  rounded-md">
               <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
               Wishlist
                 </button>
               
                 <button onClick={() => setActiveComponent('addresses')} className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100 rounded-md">
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                 Addresses
                 </button>   
            </nav>
          </div>
          
        {renderComponent()}
        </div>
      </div>
    </div>

    </>
  )
}

