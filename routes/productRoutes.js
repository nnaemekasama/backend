import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProucts,
  reviewProduct,
  updateProduct,
} from "../controllers/productController.js";
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("unAuthorized Access, no token found");
  }
})

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

const router = express.Router()

router.route("/")
.get(getProducts)
.post(protect, admin, createProduct)
router.route("/:id/reviews").post(protect, reviewProduct);
router.get("/top", getTopProucts);

router.route("/:id")
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)


export default router