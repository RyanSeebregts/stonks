import SalesDB from '../connectors/SalesDB.js';

/**
 * Inserts a new order into the sales database.
 */
export default async (req, res) => {

	// Validate the request input.
	if(!req.body.date || !req.body.amount || !req.body.status) {

		res.status(400).send('Invalid parameters supplied');
		return;
	}
	
	// Insert the new order.
	try {

		const result = await SalesDB.getInstance().query(`
			INSERT INTO orders(date, amount, status)
			VALUES ($1, $2, $3)
			RETURNING *
		`, [
			req.body.date,
			req.body.amount,
			req.body.status
		]);
	
		res.status(200).send(result.rows); // TODO - lookup inserted item value

	} catch(error) {

		res.status(500).send(error);
	}
};