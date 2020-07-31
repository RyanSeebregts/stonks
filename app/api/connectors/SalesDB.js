import pg from 'pg';

// Record a singleton instance for this connector, to reuse that database connection pool.
var singleton = null;

/**
 * Simple connector class to help with querying the postgres SalesDB.
 */
export default class SalesDB {

	/**
	 * Initialises the connector.
	 */
	constructor() {

		// Parse numeric column to float in javascript instead of string.
		pg.types.setTypeParser(1700, 'text', parseFloat);

		// Pool a connection to the postgres database server.
		this.pool = new pg.Pool({
			connectionString: process.env.DATABASE_URL, ssl: {
				rejectUnauthorized: false
			}
		});
	}

	/**
	 * Get the current instance of the connector.
	 * 
	 * @returns {SalesDB}
	 */
	static getInstance() {

		// Setup the singleton if not initialised yet.
		if(!singleton) {
			singleton = new SalesDB();
		}

		// Return the singleton instance.
		return singleton;
	}

	// ----------------
	// LIBRARY WRAPPERS
	// ----------------

	/**
	 * Connects to the database.
	 * 
	 * @async
	 * @returns {pg.Client} An instance of the database connection against which queries can be run.
	 */
	async connect() {

		return this.pool.connect();
	}

	/**
	 * Connects to the database, runs a query and then disconnects.
	 * 
	 * @param {string} queryString - The SQL query to run.
	 * @param {any[]} [params] - The list of parameters to pass into the query.
	 * 
	 * @returns {pg.Query} The database query results.
	 */
	async query(queryString, params=null) {

		// Connect to the database.
		const client = await this.connect();

		// Run the specified query.
		let result = await client.query(queryString, params);

		// Release the database connection.
		client.release();

		// Return the query results.
		return result;
	}

	// ----------------
	// DATABASE CONTENT
	// ----------------

	/**
	 * Create the default tables in the Sales DB.
	 * 
	 * Note: this function can be removed if you created the DB structure yourself using an postgres DB client.
	 * 
	 * @returns {void}
	 */
	async createTables() {

		console.log('SalesDB - creating tables');

		try {
		
			// Connect to the database.
			const client = await this.connect();
	
			// Create the orders table.
			await client.query(`
				CREATE TABLE IF NOT EXISTS orders(
					orderno SERIAL PRIMARY KEY,
					date TIMESTAMP NOT NULL,
					amount NUMERIC (10, 2) NOT NULL,
					status VARCHAR (50) NOT NULL
				)
			`);
	
			// Release the database connection.
			client.release();
	
		} catch(error) {
	
			console.error(error);
		}
	}

	/**
	 * Insert the default data records into the Sales DB
	 * 
	 * Note: this function can be removed and is here of demo purposes only.
	 * 
	 * @returns {void}
	 */
	async insertDefaultData() {

		console.log('SalesDB - inserting default data');

		const orders = [
			{
				"date": "2020-07-05 17:25:59",
				"amount": 599.95,
				"status": "Delivered"
			},
			{
				"date": "2020-07-06 17:26:02",
				"amount": 250.4,
				"status": "Shipped"
			},
			{
				"date": "2020-07-06 09:10:11",
				"amount": 320.14,
				"status": "Shipped"
			},
			{
				"date": "2020-07-07 09:10:11",
				"amount": 548.54,
				"status": "In Progress"
			},
			{
				"date": "2020-07-08 09:10:11",
				"amount": 438.05,
				"status": "In Progress"
			},
			{
				"date": "2020-07-08 09:10:11",
				"amount": 548.0,
				"status": "In Progress"
			},
			{
				"date": "2020-07-09 09:10:11",
				"amount": 456.78,
				"status": "Ready For Pickup"
			},
			{
				"date": "2020-07-10 09:10:11",
				"amount": 114.7,
				"status": "New"
			},
			{
				"date": "2020-07-11 09:10:11",
				"amount": 721.95,
				"status": "New"
			}
		]

		try {
		
			// Connect to the database.
			const client = await this.connect();
	
			// Insert each of the demo order records.
			for(const order of orders) {

				await client.query(`
					INSERT INTO orders (date, amount, status)
					SELECT $1, $2, $3
					WHERE NOT EXISTS (
						SELECT orderno
						FROM orders
						WHERE date = $1
						AND amount = $2
					);
				`, [
					order.date,
					order.amount,
					order.status
				]);
			}
	
			// Release the database connection.
			client.release();
	
		} catch(error) {
	
			console.error(error);
		}
	}
}