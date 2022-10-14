import { Schema, model } from "mongoose";
const schema = new Schema({
  img: {
    type: String,
    required: true,
  },
  imgMobile: {
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
const Navbars = model("Navbar", schema);
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

