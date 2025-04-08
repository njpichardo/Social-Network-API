// get all users
import { User, Thought } from '../models/index.js';
export const userController = {
    // Get all users
    async getAllUsers(_req, res) {
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
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Get single user by id
    async getUserById(req, res) {
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
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    // Delete user and associated thoughts
    async deleteUser(req, res) {
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
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Add friend to friend list
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Remove friend from friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};
export default userController;
