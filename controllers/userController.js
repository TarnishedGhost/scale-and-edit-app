//userController.js
const path = require('path');
const fs = require('fs');


exports.dashboard = (req, res) => {
	if (!req.session.userId) return res.redirect('/login');
	res.render('dashboard', { userId: req.session.userId, title: 'dashboard' });
};

exports.editor = (req, res) => {
	if (!req.session.userId) return res.redirect('/login');
	res.render('editor', { user: req.user, title: 'editor' });
};

exports.saveProcessedImage = (req, res) => {
	const { imageId } = req.body;

	if (!imageId) {
	return res.status(400).json({ error: 'Image ID is required' });
	}

	const inputPath = path.join('processed', `processed-${imageId}.jpg`);
	const userImagePath = path.join('user_uploads', `user-${req.user.id}-${imageId}.jpg`);

	if (!fs.existsSync(inputPath)) {
	return res.status(404).json({ error: 'Processed image not found' });
	}

	fs.rename(inputPath, userImagePath, (err) => {
	if (err) {
		console.error('Error saving processed image:', err);
		return res.status(500).json({ error: 'Failed to save processed image' });
	}

	const User = require('../models/User');
	User.findByIdAndUpdate(
		req.user.id,
		{ processedImagePath: userImagePath },
		{ new: true },
		(err) => {
		if (err) {
			console.error('Error updating user data:', err);
			return res.status(500).json({ error: 'Failed to update user data' });
		}

		res.json({ status: 'success', message: 'Image saved successfully' });
		}
	);
	});
};
