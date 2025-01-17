const sqlite3 = require('sqlite3').verbose();
const MovieModel = require('./models/MovieModel');

MovieModel.createTable();
MovieModel.createWatchedTable();

const connect =	async()	=>	{
	db = await	open({
	filename: ':memory:', // Використовуємо	базу даних	у пам'яті
	Driver:	sqlite3.Database,
});
// Створення необхідних	таблиць


const db = new	sqlite3.Database('./database.sqlite', (err)	=>	{
	if (err) {
		console.error('Помилка підключення до бази	даних:', err.message);
	} else {
		console.log('Успішне підключення до SQLite');
	}
});

module.exports=db;