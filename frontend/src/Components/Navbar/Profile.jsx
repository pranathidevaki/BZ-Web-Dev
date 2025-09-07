import React, { useEffect, useState } from "react";
import Service from "../utils/http.js";

const service = new Service();

const Profile = () => {
  const [user, setUser] = useState(null);

  const getProfileData = async () => {
    try {
      const res = await service.get("user/me");
      setUser(res);
      console.log(res);
    } catch (error) {
      console.log("Error in fetching profile data", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full shadow-md border-4 border-indigo-200"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
        <p className="mt-2 text-sm text-gray-400">ID: {user?._id}</p>

        <button className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
