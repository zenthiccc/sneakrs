import handleAsync from "express-async-handler";
import Sneaker from "../models/sneakerModel.js";

// Description: Fetch all sneakers
// Route: GET /api/sneakers
// Access: Public
const getSneakers = handleAsync(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Sneaker.countDocuments({ ...keyword });
  const sneakers = await Sneaker.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ sneakers, page, pages: Math.ceil(count / pageSize) });
});

// Description: Fetch specific sneakers
// Route: GET /api/sneakers/:id
// Access: Public
const getSneakersById = handleAsync(async (req, res) => {
  const sneaker = await Sneaker.findById(req.params.id);

  if (sneaker) {
    res.json(sneaker);
  } else {
    res.status(404);
    throw new Error(`Sneakers not found`);
  }
});

// Description: Delete a sneaker
// Route: DELETE /api/sneakers/:id
// Access: Private/Admin
const deleteSneaker = handleAsync(async (req, res) => {
  const sneaker = await Sneaker.findById(req.params.id);

  if (sneaker) {
    await sneaker.remove();
    res.json({ message: "Sneaker removed" });
  } else {
    res.status(404);
    throw new Error(`Sneakers not found`);
  }
});

// Description: Create a sneaker
// Route: POST /api/sneakers/
// Access: Private/Admin
const createSneaker = handleAsync(async (req, res) => {
  const sneaker = new Sneaker({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdSneaker = await sneaker.save();
  res.status(201).json(createdSneaker);
});

// Description: Update a sneaker
// Route: Put /api/sneakers/:id
// Access: Private/Admin
const updateSneaker = handleAsync(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const sneaker = await Sneaker.findById(req.params.id);

  if (sneaker) {
    sneaker.name = name;
    sneaker.price = price;
    sneaker.description = description;
    sneaker.image = image;
    sneaker.brand = brand;
    sneaker.category = category;
    sneaker.countInStock = countInStock;

    const updatedSneaker = await sneaker.save();
    res.json(updatedSneaker);
  } else {
    res.status(404);
    throw new Error("Sneaker not found");
  }
});

// Description: Create new review
// Route: POST /api/sneakers/:id/reviews
// Access: Private
const creeateSneakerReview = handleAsync(async (req, res) => {
  const { rating, comment } = req.body;

  const sneaker = await Sneaker.findById(req.params.id);

  if (sneaker) {
    const alreadyReviewed = sneaker.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Sneaker already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    sneaker.reviews.push(review);

    sneaker.numReviews = sneaker.reviews.length;

    sneaker.rating =
      sneaker.reviews.reduce((acc, item) => item.rating + acc, 0) /
      sneaker.reviews.length;

    await sneaker.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Sneaker not found");
  }
});

// Description: Get top products
// Route: GET /api/sneakers/:id/top
// Access: Public
const getTopProducts = handleAsync(async (req, res) => {
  const sneakers = await Sneaker.find({}).sort({ rating: -1 }).limit(3);

  res.json(sneakers);
});

export {
  getSneakers,
  getSneakersById,
  deleteSneaker,
  createSneaker,
  updateSneaker,
  creeateSneakerReview,
  getTopProducts,
};
