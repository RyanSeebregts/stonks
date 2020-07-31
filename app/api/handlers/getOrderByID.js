import SalesDB from '../connectors/SalesDB.js';

/**
 * Find the details of an order with a specific ID.
 */
export default async (req, res) => {

	// Validate the request input.
	if(!req.query.id) {

		res.status(400).send('Invalid parameters supplied');
		return;
	}

	// Query the order details.
	try {

		const result = await SalesDB.getInstance().query(`
			SELECT
				orderno,
				date,
				amount,
				status
			FROM orders
			WHERE orderno = $1
		`, [
			req.query.id
		]);
	
		res.status(200).send(result.rows.length > 0? result.rows[0]:null);

	} catch(error) {

		res.status(500).send(error);
	}
};