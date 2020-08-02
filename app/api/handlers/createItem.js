import SalesDB from '../connectors/SalesDB.js';

/**
 * Inserts a new order into the sales database.
 */
export default async (req, res) => {

	// Validate the request input.
	if(!req.body.name || !req.body.brand || !req.body.amount || !req.body.shopname) {

		res.status(400).send('Invalid parameters supplied');
		return;
	}
	
	// Insert the new order.
	try {

		const result = await SalesDB.getInstance().query(`
			INSERT INTO items(name, brand, shopname, amount)
			VALUES ($1, $2, $3, $4)
			RETURNING *
		`, [
			req.body.name,
			req.body.brand,
			req.body.shopname,
			req.body.amount
		]);
	
		res.status(200).send(result.rows); // TODO - lookup inserted item value

	} catch(error) {

		res.status(500).send(error);
	}
};