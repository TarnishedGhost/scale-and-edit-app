require('dotenv').config();
const i18n = require('./config/i18n');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');
const path = require('path');

const app = express();
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

app.use(cookieParser());
app.use(i18n.init);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/processed', express.static(path.join(__dirname, 'processed')));


// Налаштування сесій
app.use(session({
		secret: 'yourSecretKey',
		resave: false,
		saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 600 * 600,
	}
}));

// Middleware для передачі сесії до шаблонів

app.use((req, res, next) => {
		if (req.session && req.session.user) {
				req.user = req.session.user;
		} else {
				req.user = null;
		}

		res.locals.user = req.user;

		next();
});

app.use((req, res, next) => {
    res.locals.userId = req.session?.userId || null;
    next();
});

app.use((req, res, next) => {
		req.isAuthenticated = () => !!req.user;
		next();
});

app.use((req, res, next) => {
	res.locals.language = req.getLocale();
	next();
});

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
		res.render('index', { title: 'Головна сторінка' });
});
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/', authRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/image', imageRoutes);

app.post('/set-language', (req, res) => { 
	const { lang } = req.body;

	if (i18n.getLocales().includes(lang)) {
		res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
		res.json({ success: true });
	} else {
		res.status(400).json({ success: false, message: 'Invalid language' });
	}
});


app.get('/translations', (req, res) => {
	const translations = {
		header: {
			title: res.__('header.title'),
			home: res.__('header.home'),
			about: res.__('header.about'),
			login: res.__('header.login'),
			register: res.__('header.register')
		},
		footer: {
			contact: res.__('footer.contact'),
			privacy: res.__('footer.privacy')
		}
	};
	res.json(translations);
});

sequelize.sync().then(() => console.log('Базу даних синхронізовано.'));

module.exports = app;
