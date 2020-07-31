import getOrderByID from './handlers/getOrderByID.js';
import getOrders from './handlers/getOrders.js';
import createOrder from './handlers/createOrder.js';
import updateOrder from './handlers/updateOrder.js';

import express from 'express';

// Register all API endpoints & handlers for the app.
const router = express.Router();

router.get('/api/orders/:id', getOrderByID);
router.get('/api/orders', getOrders);
router.post('/api/orders', createOrder);
router.put('/api/orders', updateOrder);

export default router;