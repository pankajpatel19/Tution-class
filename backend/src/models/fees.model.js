import mongoose, { Schema } from "mongoose";

const feesSchema = new Schema(
  {
    className: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    monthlyFees: { type: Number, required: true, trim: true },
    yearlyFees: { type: Number, required: true, trim: true },
    admissionFees: { type: Number, required: true, trim: true },
    discount: { type: Number, trim: true },
    note: { type: String, trim: true },
    isAvailable: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

feesSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Fees = mongoose.model("Fees", feesSchema);

export default Fees;
