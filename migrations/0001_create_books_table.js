const tableName = 'books';

exports.up = (knex, Promise) => {
    return knex
        .schema
        .createTable(tableName, function (t) {
            t.increments('id').unsigned().notNullable().primary();
            t.dateTime('created_at').notNullable();
            t.dateTime('updated_at').notNullable();
            t.string('title').notNullable();
            t.text('about');
            t.text('language');
            t.string('genre');
            t.string('isbn13');
            t.string('isbn10');
            t.string('publisher');
            t.date('publish_date');
            t.integer('hardcover');
        });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable(tableName);
};
