import express from "express";
const router = express.Router();
import {
  createHotel,
  updateHotelById,
  deleteHotelById,
  getAllHotel,
  getHotelById,
} from "../controller/hotel.js";

// create
router.post("/", createHotel);
// update
router.put("/:id", updateHotelById);

//delete hotel

router.delete("/:id", deleteHotelById);
// get  hotelByid
router.get("/:id", getHotelById);
// get all hotel
router.get("/", getAllHotel);
export default router;
