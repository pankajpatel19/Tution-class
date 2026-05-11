import mongoose, { Schema } from "mongoose";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "converted", "not_converted"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

enquirySchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
