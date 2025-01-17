const path = require('path');
const fs = require('fs');
const { Jimp } = require('jimp');

exports.uploadImage = async (req, res) => {
	const file = req.file;
	const name = req.file.filename;

	if (!file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}

	const imageId = Date.now();
	
	console.log('Image object:', name);

	try {

		res.json({
			name,
			previewUrl: name,
		});
	} catch (err) {
		
		res.status(500).json({ error: 'Failed to process image' });
	}
};

exports.processImage = async (req, res) => {
	
	const { imageId, resizeWidth, resizeHeight, sepia, grayscale } = req.body;
	
	if (!imageId) {
		return res.status(400).json({ error: 'Image ID is required' });
	}

	const inputPath = path.join('uploads', imageId);
	const outputPath = path.join('processed', imageId);
	
	if (!fs.existsSync(inputPath)) {
		return res.status(404).json({ error: 'Image not found' });
	}

	try {
		const image = await Jimp.read(inputPath);

		if (resizeWidth && resizeHeight) {
			image.resize(parseInt(resizeWidth), parseInt(resizeHeight));
		}
		if (sepia) {
			image.sepia();
		}
		if (grayscale) {
			image.grayscale();
		}

		await image.write(inputPath);

		res.json({
			processedImageUrl: `/${inputPath}`,
		});
	} catch (err) {
		console.error('Error processing image:', err);
		res.status(500).json({ error: 'Failed to process image' });
	}
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
