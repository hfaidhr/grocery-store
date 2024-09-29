const { pool } = require("../config/db.connect");

async function uploadImagesToPostgres(images) {
	try {
		const query = `
            INSERT INTO product_images (images)
            VALUES ($1)
            RETURNING id;
        `;

		const imageIds = [];
		for (const img of images) {
			const values = [img.buffer];
			const res = await pool.query(query, values);
			imageIds.push(res.rows[0].id.toString());
		}

		return imageIds;
	} catch (error) {
		console.error("Error saving images to PostgreSQL:", error);
		throw new Error(`Failed to upload images: ${error.message}`);
	}
}

async function fetchImagesFromPostgres(imageIds) {
	try {
		const query = `
            SELECT id
            FROM product_images
            WHERE id = ANY($1::int[])
        `;
		const result = await pool.query(query, [imageIds]);

		return result.rows.map((row) => ({
			id: row.id,
			imageUrl: `/image/${row.id}`,
		}));
	} catch (error) {
		console.error("Error fetching images from PostgreSQL:", error);
		return [];
	}
}

async function deleteImagesFromPostgres(imageIds) {
	try {
		const query = `DELETE FROM product_images WHERE id = ANY($1::int[])`;
		await pool.query(query, [imageIds]);
	} catch (error) {
		console.error("Error deleting images from PostgreSQL:", error);
		throw new Error("Error deleting images from PostgreSQL: " + error.message);
	}
}

module.exports = {
	uploadImagesToPostgres,
	fetchImagesFromPostgres,
	deleteImagesFromPostgres,
};
