import SalesDB from '../connectors/SalesDB.js';

/**
 * Queries the list of orders in the sales database.
 */
export default async (req, res) => {

	// Validate the request input.
	// n/a

	// Query the list of orders.
	try {

		const result = await SalesDB.getInstance().query(`
			SELECT
				orderno,
				date,
				amount,
				status
			FROM orders
		`);
	
		res.status(200).send(result.rows);

	} catch(error) {

		res.status(500).send(error);
	}
};