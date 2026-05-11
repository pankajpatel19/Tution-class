import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

facultySchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
