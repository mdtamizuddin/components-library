import { model, Schema, models } from "mongoose";
const schema = new Schema({
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  imgMobile: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    default: "",
  },
});
const Component = models.Component || new model("Component", schema);
export default Component;
