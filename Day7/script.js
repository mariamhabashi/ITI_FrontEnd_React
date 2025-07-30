document.addEventListener('DOMContentLoaded', () => {
	// --- Element Selectors ---
	const timeDisplayEl = document.getElementById('time-display');
	const sessionDisplayEl = document.getElementById('session-display');
	const browserNameEl = document.getElementById('browser-name');
	const platformEl = document.getElementById('platform');
	const languageEl = document.getElementById('language');
	const statusEl = document.getElementById('status');
	const screenSizeEl = document.getElementById('screen-size');
	const windowSizeEl = document.getElementById('window-size');
	const availableSpaceEl = document.getElementById('available-space');
	const colorDepthEl = document.getElementById('color-depth');

	const btnRefresh = document.getElementById('btn-refresh');
	const btnUrlInfo = document.getElementById('btn-url-info');
	const btnOpenHelper = document.getElementById('btn-open-helper');
	const btnTestStorage = document.getElementById('btn-test-storage');
	const btnGoBack = document.getElementById('btn-go-back');
	const btnBrowserStats = document.getElementById('btn-browser-stats');

	const modalOverlay = document.getElementById('modal-overlay');
	const modalTitle = document.getElementById('modal-title');
	const modalBody = document.getElementById('modal-body');
	const modalCloseBtn = document.getElementById('modal-close-btn');

	const sessionStartTime = new Date();

	// --- Core Functions ---

	function updateCurrentTime() {
		const now = new Date();
		timeDisplayEl.textContent = now.toLocaleTimeString();
	}

	function updateSessionTime() {
		const now = new Date();
		const diffSeconds = Math.floor((now - sessionStartTime) / 1000);
		const h = Math.floor(diffSeconds / 3600);
		const m = Math.floor((diffSeconds % 3600) / 60);
		const s = diffSeconds % 60;
		sessionDisplayEl.textContent = `${h}h ${m}m ${s}s`;
	}

	function updateInfoOnPage() {
		// Browser Info
		browserNameEl.textContent = navigator.appName;
		platformEl.textContent = navigator.platform;
		languageEl.textContent = navigator.language;
		statusEl.textContent = navigator.onLine ? 'Online' : 'Offline';
		statusEl.style.color = navigator.onLine ? 'green' : 'red';

		// Screen & Window Info
		screenSizeEl.textContent = `${screen.width} x ${screen.height}`;
		windowSizeEl.textContent = `${window.innerWidth} x ${window.innerHeight}`;
		availableSpaceEl.textContent = `${screen.availWidth} x ${screen.availHeight}`;
		colorDepthEl.textContent = `${screen.colorDepth}-bit`;
	}

	// --- Modal Functions ---

	function openModal(title, content) {
		modalTitle.innerHTML = title; // Use innerHTML to allow icons
		modalBody.innerHTML = content;
		modalOverlay.classList.remove('hidden');
	}

	function closeModal() {
		modalOverlay.classList.add('hidden');
	}

	// --- Event Listeners ---

	btnRefresh.addEventListener('click', updateInfoOnPage);
	btnGoBack.addEventListener('click', () => {
		if (history.length > 1) {
			history.back();
		} else {
			alert('No previous page in history.');
		}
	});

	modalCloseBtn.addEventListener('click', closeModal);
	modalOverlay.addEventListener('click', (event) => {
		if (event.target === modalOverlay) {
			closeModal();
		}
	});

	btnUrlInfo.addEventListener('click', () => {
		const title = '<i class="fa-solid fa-link"></i> URL Information';
		const content = `
            <ul>
                <li><strong>Full URL:</strong> ${location.href}</li>
                <li><strong>Protocol:</strong> ${location.protocol}</li>
                <li><strong>Hostname:</strong> ${location.hostname}</li>
                <li><strong>Pathname:</strong> ${location.pathname}</li>
            </ul>
        `;
		openModal(title, content);
	});

	btnBrowserStats.addEventListener('click', () => {
		const title = '<i class="fa-solid fa-chart-simple"></i> Detailed Browser Statistics';
		const content = `
            <ul>
                <li><strong>User Agent:</strong> ${navigator.userAgent}</li>
                <li><strong>App Version:</strong> ${navigator.appVersion}</li>
                <li><strong>Cookies Enabled:</strong> ${navigator.cookieEnabled}</li>
            </ul>`;
		openModal(title, content);
	});

	btnTestStorage.addEventListener('click', () => {
		const title = '<i class="fa-solid fa-database"></i> Storage Test Results';
		try {
			const testKey = 'digitalAssistantTest';
			const testValue = new Date().toISOString();
			localStorage.setItem(testKey, testValue);
			const retrievedValue = localStorage.getItem(testKey);

			const isMatch = testValue === retrievedValue;
			const matchResult = isMatch
				? '<i class="fa-solid fa-check" style="color: green;"></i> Success'
				: '<i class="fa-solid fa-times" style="color: red;"></i> Failure';

			const content = `
                <ul>
                    <li><strong>Value Stored:</strong> ${testValue}</li>
                    <li><strong>Value Retrieved:</strong> ${retrievedValue}</li>
                    <li><strong>Match:</strong> ${matchResult}</li>
                </ul>`;
			openModal(title, content);
		} catch (e) {
			openModal(title, '<p>Local Storage is blocked or unavailable.</p>');
		}
	});

	btnOpenHelper.addEventListener('click', () => {
		const helperWindow = window.open('', 'helper', 'width=420,height=300');
		if (helperWindow) {
			helperWindow.document.write(`
                <html>
                    <head><title>Helper Window</title>
                        <style>
                            body { font-family: 'Roboto', sans-serif; text-align: center; padding: 20px; background-color: #f0f2f5;}
                            h2 { color: #00796b; }
                            button { padding: 8px 16px; border: 1px solid #004d40; background-color: #e0f2f1; color: #004d40; border-radius: 5px; cursor: pointer;}
                        </style>
                    </head>
                    <body>
                        <h2><i class="fa-regular fa-hand-sparkles"></i> Helper Window</h2>
                        <p>This window was opened by the Digital Assistant.</p>
                        <p>Opened at: ${new Date().toLocaleTimeString()}</p>
                        <button onclick="window.close()">Close Me</button>
                    </body>
                </html>
            `);
		} else {
			alert('Popup was blocked by the browser. Please allow popups.');
		}
	});

	// --- Initial Page Load ---
	setInterval(updateCurrentTime, 1000);
	setInterval(updateSessionTime, 1000);
	updateInfoOnPage(); 
});