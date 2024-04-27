import { Router } from 'express';
import { solveWaterJug } from './waterJugController';

/**
 * @swagger
 * /water-jug:
 *   post:
 *     summary: Solve the water jug problem
 *     description: Receives capacities and a target amount to calculate the steps to achieve it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x_capacity:
 *                 type: number
 *                 description: Capacity of bucket X
 *                 example: 2
 *               y_capacity:
 *                 type: number
 *                 description: Capacity of bucket Y
 *                 example: 5
 *               z_amount_wanted:
 *                 type: number
 *                 description: Amount of water wanted
 *                 example: 3
 *     responses:
 *       200:
 *         description: Successfully returns the steps of solving the problem.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   step:
 *                     type: number
 *                   bucketX:
 *                     type: number
 *                   bucketY:
 *                     type: number
 *                   action:
 *                     type: string
 *       400:
 *         description: Invalid input
 */
const router = Router();

router.post('/water-jug', solveWaterJug);

export default router;