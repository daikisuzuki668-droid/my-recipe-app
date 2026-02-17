import mysql from 'mysql2/promise';
import { dbConfig } from '../config/database';

export const recipeService = {
    getAll: async () => {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute('SELECT * FROM recipes');
        await conn.end();
        return rows;
    },
    create: async (name: string, ingredients: string) => {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute('INSERT INTO recipes (name, ingredients) VALUES (?, ?)', [name, ingredients]);
        await conn.end();
    },
    update: async (id: number, name: string, ingredients: string) => {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute('UPDATE recipes SET name = ?, ingredients = ? WHERE id = ?', [name, ingredients, id]);
        await conn.end();
    },
    delete: async (id: number) => {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute('DELETE FROM recipes WHERE id = ?', [id]);
        await conn.end();
    }
};
