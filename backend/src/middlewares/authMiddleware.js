import jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {
   try {


       let jwtToken = req?.cookies?.jwt;


       console.log("Printing the jwt token from cookies in auth middleware", jwtToken);


       if(!jwtToken) {
           console.error("No token found in cookies. Sending unauthorized error");
           return res.status(401).json({ status: "UNAUTHORIZED", message: "user token not found" });
       }


       try {


           let decoded = await jwt.verify(jwtToken, process.env.JWT_SECRET);
           req.user = decoded;
           next();


       }catch (error){


           console.error("Error in verifying the token in auth middleware", error.message);
           return res.status(401).json({ status: "UNAUTHORIZED", message: "You are not authorized to access this route. Please login and try again." });
       }


   }catch(error){


       console.error("Error in auth middleware", error.message);
       return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Something went wrong in auth middleware" });
   }
}
