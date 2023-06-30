const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');


// GET /api/comments
router.get('/', async (req, res) => {
    // find all comments
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST /api/comments
router.post('/', auth, async (req, res) => {
    // create a new comment
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);


// DELETE /api/comments/:id
router.delete('/:id', auth, async (req, res) => {
    // delete a comment by its `id` value
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;