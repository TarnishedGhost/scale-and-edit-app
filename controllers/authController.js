const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
	console.log(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.redirect('/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/user/dashboard');
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
};

exports.getAboutPage = (req, res) => {
	res.render('about', {title: 'Про проект!'});
};