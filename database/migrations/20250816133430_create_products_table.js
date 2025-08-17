/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('products', function (table) {
        table.increments('id').primary().unsigned();
        table.string('name').notNullable();
        table.text('description');
        table.decimal('price', 10, 2).notNullable();
        table.integer('stock_quantity').notNullable().defaultTo(0);
        table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

// Migration in not working check in chatgpt

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('products');
};
