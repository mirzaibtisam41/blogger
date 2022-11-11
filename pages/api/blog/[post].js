import Blog from "../../../models/blog";
import Category from "../../../models/category";
import { mongoConnect } from "../../../utils/db";
import mongoose from "mongoose";

export default async function handler(req, res) {
  mongoConnect();
  let id = mongoose.Types.ObjectId(req.query.post);
  if (req.method === 'GET') {
    Blog.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "category",
          foreignField: "_id",
          as: "Category",
        },
      },
      { $unwind: '$Category' },
      { $project: { category: 0 } },
    ])
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
  else if (req.method === 'POST') {
    let postPerPage = 6;
    let start = req.body.page * postPerPage;
    Blog.find({ category: id }).count()
      .then(count => {
        Blog.aggregate([
          { $match: { category: id } },
          {
            $lookup: {
              from: Category.collection.name,
              localField: "category",
              foreignField: "_id",
              as: "Category",
            },
          },
          { $unwind: '$Category' },
          { $project: { category: 0 } },
          { $skip: start },
          { $limit: postPerPage }
        ])
          .then((data) => {
            return res.status(200).json({ blogs: data, count });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      });
  }
}
