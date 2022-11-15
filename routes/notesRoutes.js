const {Router} = require('express');
const { notes_get, note_get, note_post, updateNote_post, note_delete } = require('../controllers/notesControllers');
const { requireAuth } = require('../middleware/authMiddleware')
const router = Router();

router.get('/getnotes', requireAuth, notes_get); // id of user
router.post('/createnewnote', requireAuth, note_post) // id of user
router.get('/note/:id', requireAuth, note_get); // id of note
router.post('/updatenote/:id', requireAuth, updateNote_post) // id of note
router.delete('/note/:id', requireAuth, note_delete) // id of note

module.exports = router;