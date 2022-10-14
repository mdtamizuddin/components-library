
import connect from "../../../utils/connectMongo";

import Component from "../models/navbar";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

connect();

export default function handler(req, res) {
  const { id } = req.query;
  Component.findOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500);
      console.log(id);
    } else {
      res.status(200).json(data);
    }
  });
}
