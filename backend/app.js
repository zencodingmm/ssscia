const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./compoments/route/auth");
const connection = require("./compoments/model/db");
const PORT = process.env.PORT || 4001;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200);
	res.send("Welcome to SSSCIA Project");
});

// routes

require("./compoments/route/tbl_categories_route")(app);
require("./compoments/route/tbl_crop_factors_route")(app);
require("./compoments/route/tbl_land_factors_route")(app);
require("./compoments/route/tbl_loan_submittion_route")(app);
require("./compoments/route/tbl_members_route")(app);
require("./compoments/route/tbl_posts_route")(app);
require("./compoments/route/tbl_users_route")(app);
require("./compoments/route/tbl_admin_route")(app);

app.use("/api/auth", authRoute);
app.get("/api/tablecounts", (req, res) => {
	connection.query("SHOW TABLES", (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Failed to retrieve tables" });
		}

		const tableCounts = {};
		let processedTables = 0;

		results.forEach((table) => {
			const tableName = table[`Tables_in_ssscia`];
			connection.query(`SELECT COUNT(*) AS count FROM ${tableName}`, (err, result) => {
				if (err) {
					return res.status(500).json({ error: `Failed to get row count for ${tableName}` });
				}

				// Store the row count in the tableCounts object
				tableCounts[tableName] = result[0].count;

				processedTables++;

				// If all tables have been processed, send the response
				if (processedTables === results.length) {
					// Close the connection when all tables are processed
					res.json(tableCounts);
				}
			});
		});
	});
});

app.listen(PORT, (error) => {
	if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT);
	else console.log("Error occurred, server can't start", error);
});
