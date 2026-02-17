import { Router } from 'express';
import { recipeService } from '../services/recipeService';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await recipeService.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

router.post('/', async (req, res) => {
    try {
        await recipeService.create(req.body.name, req.body.ingredients);
        res.status(201).send('Created');
    } catch (err) {
        res.status(500).json({ error: 'Failed to create recipe' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await recipeService.update(Number(req.params.id), req.body.name, req.body.ingredients);
        res.send('Updated');
    } catch (err) {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await recipeService.delete(Number(req.params.id));
        res.send('Deleted');
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
});

export default router;
