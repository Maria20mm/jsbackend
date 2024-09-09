import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Extract the token from cookies or headers
    const token = req.cookies?.accessToken ||
                  (req.header("Authorization") && req.header("Authorization").replace("Bearer", ""));

    if (!token) {
      throw new ApiError(401, "Unauthorized Request: Token is missing");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find the user associated with the token
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    // Attach the user object to the request
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle errors, falling back to a default message if none is provided
    throw new ApiError(401,"Invalid access token");
  }
});