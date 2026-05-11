import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    class: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    fees: { type: Number, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    schedule: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

courseSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
