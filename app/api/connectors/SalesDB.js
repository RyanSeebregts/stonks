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

		console.log('DB - creating tables');

		try {
		
			// Connect to the database.
			const client = await this.connect();
	
			// Create the orders table.
			await client.query(`
				CREATE TABLE IF NOT EXISTS items(
					name VARCHAR (50) NOT NULL,
					brand VARCHAR (50) NOT NULL,

					shopname VARCHAR (50) NOT NULL,
					amount NUMERIC (1000) NOT NULL
				)
			`);
	
			// Create the orders table.
			await client.query(`
				CREATE TABLE IF NOT EXISTS orders(
					shopname VARCHAR (50) NOT NULL,

					items TEXT[] 
				)
			`);

			// Release the database connection.
			client.release();
	
		} catch(error) {
	
			console.error(error);
		}
	}

	async createTablesOrders() {

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
		//this.ClearDefaultData()
		
		console.log('SalesDB - inserting default data');

		const items = [

		]

		try {
		
			// Connect to the database.
			const client = await this.connect();
	
			// Insert each of the demo order records.
			for(const item of items) {

				await client.query(`
					INSERT INTO items (name, brand, shopname, tags, amount)
					SELECT $1, $2, $3, $4, $5 
				`, [
					item.name,
					item.brand,
					item.shopname,
					item.tages,
					item.amount,
				]);
			}
	
			// Release the database connection.
			client.release();
	
		} catch(error) {
	
			console.error(error);
		}
		
	}

	async ClearDefaultData() {

		console.log('SalesDB - deleting default data');

		try {
		
			// Connect to the database.
			const client = await this.connect();
	
			await client.query('DELETE FROM items');
			
	
			// Release the database connection.
			client.release();
	
		} catch(error) {
	
			console.error(error);
		}
	}
}