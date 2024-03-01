import {Router} from "express";
import Post from "../models/Post";
import {PostTypes} from "../types";
import {imageUpload} from "../multer";

const postsRouter = Router();

postsRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find().sort({datetime: -1});

    res.send(posts);
  } catch (err) {
    next(err);
  }
});

postsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const postData: PostTypes = {
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    if (!req.body.description && !req.body.image) {
      res.status(422).send({error: 'Please enter at least one of these two. Description or image'});
    } else {
      const post = new Post(postData);
      await post.save();

      return res.send(post);
    }
  } catch (err) {
    next(err);
  }
});

export default postsRouter;