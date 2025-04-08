// get all thoughts
import { User, Thought } from '../models/index.js';
export const thoughtController = {
    // Get all thoughts
    async getAllThoughts(_req, res) {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
            return;
        }
    },
    // Get single thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Add thought to the associated user
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            return res.json(thought);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    // Update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    // Delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            // Remove thought from user's thoughts array
            await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
            return res.json({ message: 'Thought deleted successfully!' });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    // Remove reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
};
export default thoughtController;
