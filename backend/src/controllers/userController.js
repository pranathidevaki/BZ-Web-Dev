import jwt from "jsonwebtoken";
import { User } from "../models/user/user.model.js";


export const getMyProfile = async (req, res) => {
   try {


       let user = await User.findById(req.user.id);
      
       return res.status(200).json({ status: "SUCCESS", message: "Profile fetched successfully", data: user });




   }catch (error) {
       console.error("Error in getting the profile of user", error.message);
       return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Something went wrong in getting the profile of user." });
   }
}
