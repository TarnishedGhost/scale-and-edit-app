window.addEventListener('scroll', function() {
	var header = document.getElementById('header');
	var scrollPosition = window.scrollY || document.documentElement.scrollTop;

	if (scrollPosition >= 100) {
		header.classList.add('top');
	} else {
		header.classList.remove('top');
	}
});

document.querySelectorAll('.language-switch').forEach((button) => {
	button.addEventListener('click', (e) => {
		const lang = e.target.dataset.lang;

		fetch('/set-language', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lang }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {

					fetch(`/translations?lang=${lang}`)
						.then((response) => response.json())
						.then((translations) => {

							Object.keys(translations).forEach((key) => {
								const element = document.querySelector(`[data-translate="${key}"]`);
								if (element) {
									element.textContent = translations[key];
								}
							});

							updateSocialButtons();
						});
			location.reload();
				}
			})
			.catch((error) => console.error('error:', error));
	});
});


function updateSocialButtons() {
	const currentUrl = encodeURIComponent(window.location.href);
	const title = encodeURIComponent(document.title);
	const socialButtonsContainer = document.getElementById('social-buttons');

	socialButtonsContainer.innerHTML = '';

	const socialButtons = `
		<a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" rel="noopener noreferrer"><img src="/img/fb.png" alt="Share"></a>
		<a href="https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}" target="_blank" rel="noopener noreferrer"><img src="/img/tw.png" alt="Share"></a>
		<a href="https://t.me/share/url?url=${currentUrl}&text=${title}" target="_blank" rel="noopener noreferrer"><img src="/img/telegram.png" alt="Share btn"></a>
	`;

	socialButtonsContainer.innerHTML = socialButtons;
}

document.addEventListener('DOMContentLoaded', () => {

	const defaultLang = 'en';
	fetch(`/translations?lang=${defaultLang}`)
		.then((response) => response.json())
		.then((translations) => {
			Object.keys(translations).forEach((key) => {
				const element = document.querySelector(`[data-translate="${key}"]`);
				if (element) {
					element.textContent = translations[key];
				}
			});

			updateSocialButtons();
		});
});
