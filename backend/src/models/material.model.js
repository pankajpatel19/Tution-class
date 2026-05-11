import mongoose, { Schema } from "mongoose";

const materialSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

materialSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

const Material = mongoose.model("Material", materialSchema);

export default Material;
