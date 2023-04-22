import express from "express";
const router = express.Router();
import {
  updateUserById,
  getAllUser,
  getUserById,
  deleteUserById,
} from "../controller/user.js";
import { verifyToken } from "../utils/verifyToken.js";

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello check");
});

// update
router.put("/:id", updateUserById);
//delete hotel
router.delete("/:id", deleteUserById);
// get  hotelByid
router.get("/:id", getUserById);
// get all hotel
router.get("/", getAllUser);
export default router;
