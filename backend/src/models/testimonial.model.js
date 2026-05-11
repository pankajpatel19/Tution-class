import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, trim: true, min: 0, max: 5 },
    photo: {
      type: String,
      required: true,
    },
    review: { type: String, required: true, trim: true },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

testimonialSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
