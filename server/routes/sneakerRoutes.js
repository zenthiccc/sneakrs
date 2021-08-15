import express from "express";
import {
  deleteSneaker,
  getSneakers,
  getSneakersById,
  createSneaker,
  updateSneaker,
  getTopProducts,
  creeateSneakerReview,
} from "../controllers/sneakerController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSneakers).post(protect, admin, createSneaker);
router.route("/:id/reviews").post(protect, creeateSneakerReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getSneakersById)
  .delete(protect, admin, deleteSneaker)
  .put(protect, admin, updateSneaker);

export default router;
