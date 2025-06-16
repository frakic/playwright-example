import { test as setup, testUsers } from '@playwright/fixtures';
import { logInAndSaveState } from '@playwright/utils';

setup.beforeAll(async () => {
	if (!process.env.TEST_USERS) {
		process.env.TEST_USERS = JSON.stringify(testUsers);
	}
});

setup('log in as an active user', async ({ loginPage, testUsers, iotDashboardPage, header }) => {
	await loginPage.goto();
	await logInAndSaveState(testUsers.ActiveUser, 'ActiveUser', loginPage, header, iotDashboardPage);
});
