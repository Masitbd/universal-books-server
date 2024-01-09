import express from 'express';

const router = express.Router();

// This routes for getting all the Specimen
router.get('/specimen');

// This route for creating a new specimen
router.post('/specimen');

// This route for getting a single specimen
router.get('/specimen/:id');

// This route for Editing  a single specimen
router.patch('/specimen');

// This route for deleting a specimen
router.delete('/specimen');

export const specimen_routes = router;
