// можешь сделать приложение на express.js, архитектура MVC, для работы с базой использовать ORM, нужно установить
// пакеты для сессий, загрузки изображений, шифрования паролей, плюс пакет GraphicsMagick,
// сайт будет иметь такую структуру: главная, страница об сайте, страница входа, регистрации, страница пользователя
// у пользователя будет две страницы мои проекты, и редактор. Функция сайта простой редактор изображений, у изображений
// можно будет применять разные эффекты, добавлять теги, удалять.
// У базы будет структура: users (
      // id INTEGER PRIMARY KEY AUTOINCREMENT,
      // name TEXT,
      // email TEXT,
      // password TEXT,
      // role TEXT CHECK(role IN ('user', 'moderator', 'admin')) DEFAULT 'user',
      // registration_date TEXT DEFAULT CURRENT_TIMESTAMP
    // );
// images (
      // id INTEGER PRIMARY KEY AUTOINCREMENT,
      // title TEXT,
      // description TEXT,
      // visibility INTEGER,
      // added_by INTEGER,
      // FOREIGN KEY (added_by) REFERENCES users(id)
    // );
// tags (
      // id INTEGER PRIMARY KEY AUTOINCREMENT,
      // title TEXT,
      // FOREIGN KEY (added_by) REFERENCES users(id)
      // FOREIGN KEY (added_by) REFERENCES images(id)
    // );
	
require('dotenv').config();
const app = require('./app');

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));