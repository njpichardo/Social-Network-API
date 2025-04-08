// get all users

// get single user by id

// create a new user

// update a user

// delete user (BONUS: and delete associated thoughts)

// add friend to friend list

// remove friend from friend list

import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

export const userController = {
  // Get all users
  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await User.find()
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v');
      
      return res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get single user by id
  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.userId)
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // Update a user
  async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // Delete user and associated thoughts
  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      // Delete user's thoughts
      await Thought.deleteMany({ username: user.username });
      
      // Delete user
      await User.findByIdAndDelete(req.params.userId);
      
      return res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Add friend to friend list
  async addFriend(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Remove friend from friend list
  async removeFriend(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

export default userController;