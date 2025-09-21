import jwt from 'jsonwebtoken';
 
const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


export default adminAuth

// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//   try {
//     let token = req.headers.token;

//     if (!token && req.headers.authorization) {
//       if (req.headers.authorization.startsWith("Bearer ")) {
//         token = req.headers.authorization.split(" ")[1];
//       }
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     // Check admin role (adjust field name based on your token payload)
//     if (!decoded.isAdmin) {
//       return res.status(403).json({ success: false, message: "Admin access required" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default adminAuth;
