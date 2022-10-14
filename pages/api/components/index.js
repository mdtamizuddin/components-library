import connect from "../../../utils/connectMongo";

import Component from "../models/navbar";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

connect();

export default function handler(req, res) {
  if (req.method === "POST") {
    const newNav = new Component(req.body);
    newNav.save((err) => {
      if (err) {
        res.status(200).send({ message: "Something went wrong" });
      } else {
        res.send({ message: "Data Inserted" });
      }
    });
  } else if (req.method === "DELETE") {
    Component.deleteOne({ _id: req.headers.id }, (err) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).send("data Deleted");
      }
    });
  } else {
    Component.find({ category: req.headers.category }, (err, data) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).json(data);
      }
    });
  }
}
