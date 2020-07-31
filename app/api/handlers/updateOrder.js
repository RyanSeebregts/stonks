import SalesDB from '../connectors/SalesDB.js';

/**
 * Updates the details of an existing order in the sales database.
 */
export default async (req, res) => {

	// Validate the request input.
	if(!req.body.id || !req.body.date || !req.body.amount || !req.body.status) {

		res.status(400).send('Invalid parameters supplied');
		return;
	}
	
	// Insert the new order.
	try {

		const result = await SalesDB.getInstance().query(`
			UPDATE orders
			SET
				date = $2,
				amount = $3,
				status = $4
			WHERE orderno = $1
			RETURNING *
		`, [
			req.body.orderno,
			req.body.date,
			req.body.amount,
			req.body.status
		]);
	
		res.status(200).send(result.rows); // TODO - lookup update item value

	} catch(error) {

		res.status(500).send(error);
	}
};