const { db } = require("../../database/connections");

class Product {
    async getAll() {
        return await db('products').select('*');
    }

    async create(data) {
        return await db('products').insert(data).returning('*');
    }
}

module.exports = new Product();

