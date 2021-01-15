import express from "express";
import mongoose from "mongoose";

import TaskMessage from "../models/taskMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const tasks = await TaskMessage.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const task = await TaskMessage.findById(id);
    console.log(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, description, creator } = req.body;

  const newTask = new TaskMessage({ title, description, creator });

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updateTask = { creator, title, description, _id: id };

  await TaskMessage.findByIdAndUpdate(id, updateTask, { new: true });

  res.json(updateTask);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await TaskMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
