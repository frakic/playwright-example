import { devices } from '@playwright/test';

export const browserProjects = [
	{
		name: 'chromium',
		use: {
			...devices['Desktop Chromium'],
			viewport: { width: 1920, height: 1080 },
		},
	},
	{
		name: 'firefox',
		use: {
			...devices['Desktop Firefox'],
			viewport: { width: 1920, height: 1080 },
		},
	},
];
