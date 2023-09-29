import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import requestHandller from "../handllers/request.handller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewsOfUser
);

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 })
        .withMessage("mediaId cannot be empty"),
    body("content")
        .exists().withMessage("content is required")
        .isLength({ min: 1 })
        .withMessage("content cannot be empty"),
    body("mediatype")
        .exists()
        .withMessage("mediatype is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
        .exists()
        .withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists()
        .withMessage("mediaPoster is required"),
    requestHandller.validate,
    reviewController.create
);

router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
);

export default router;