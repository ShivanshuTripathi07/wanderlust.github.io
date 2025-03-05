const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


//reviews post(route)
router.post("/", async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
});

module.exports = router;