const mongoose = require("mongoose");
module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
const databaseNames = ['nse_listed_stocks', 'bse_listed_stocks'];

const mongoURIs = databaseNames.map((databaseName) => `${process.env.DB},${databaseName}`);


// Create Mongoose connections for each database
const connections = [];
mongoURIs.forEach((uri) => {
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connections.push(connection);
});