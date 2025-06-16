import path from 'path';
import dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';
import { setupProjects } from './config/setupProjects';
import { userProjects } from './config/userProjects';
import { browserProjects } from './config/browserProjects';

export const LONG_TIMEOUT = 60 * 1000;
export const SHORT_TIMEOUT = 5 * 1000;

dotenv.config({
	path: path.resolve(
		process.cwd(),
		'tests',
		'environments',
		`.env.${process.env.TARGET_ENV || 'local'}`
	),
	override: true,
});

export default defineConfig({
	outputDir: '../../test-results',
	reportSlowTests: null,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,
	timeout: LONG_TIMEOUT,
	expect: { timeout: SHORT_TIMEOUT },
	reporter: process.env.CI
		? [['html', { open: 'never' }], ['github']]
		: [['html', { open: 'always' }], ['line']],
	fullyParallel: true,
	use: {
		baseURL: process.env.BASE_URL,
		trace: process.env.CI ? 'retain-on-failure' : 'on',
		actionTimeout: SHORT_TIMEOUT,
	},
	projects: [
		...setupProjects,
		...userProjects.flatMap((user) =>
			browserProjects.map((browser) => ({
				name: `${user.name}-${browser.name}`,
				testMatch: user.testMatch,
				dependencies: user.dependencies,
				use: browser.use,
			}))
		),
	],
});
