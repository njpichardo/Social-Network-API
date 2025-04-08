// /api/thoughts
// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/reactions
// /api/thoughts/:thoughtId/reactions/:reactionId
import { Router } from 'express';
import thoughtController from '../../controllers/thought-controller.js';
const router = Router();
// /api/thoughts
router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);
export default router;
