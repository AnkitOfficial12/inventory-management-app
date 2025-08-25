const { db } = require("../../database/connections");

class Product {
    async getAll({status, search, page = 1, limit = 10, sort_by, order}) {
        let query = db('products');
        
        // Filter by status
        if (status) {
            query.where('status', status.toUpperCase());
        }

        // Search by name

        if (search) {
            query.where('name','ilike', `%${search}`)
                .orWhere('description','ilike', `%${search}`);
        }

        const validSortColumns = ['name', 'stock_quantity', 'price', 'created_at', 'updated_at'];
        const validSortOrder = ['asc', 'desc'];

        if(sort_by && validSortColumns.includes(sort_by)) {
            query.orderBy(sort_by, validSortOrder.includes(order) ? order : 'asc');
        }

        const offset = (page - 1) * limit;
        query.offset(offset).limit(limit);

        // total number of records & pages
        const total = await db('products').count();
        const totalPages = Math.ceil(total[0].count / limit);

        // fetch the records
        const data = await query.select('*');

        return {
            total: total[0].count,
            totalPages,
            page,
            limit,
            data
        };


        // return await db('products').select('*');
    }

    async create(data) {
        return await db('products').insert(data).returning('*');
    }

    // Update Product
    async update(id, data) {
        return await db('products')
        .where({ id, status: 'ACTIVE' }).update({...data, update_at: db.fn.now()}).returning('*');
    }
}

module.exports = new Product();

