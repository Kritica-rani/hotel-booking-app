import Hotel from "../model/Hotel.js";
export const createHotel = async (req, res) => {
  console.log("req.body", req.body);
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    return res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updateHotelById = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteHotelById = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find({});
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
