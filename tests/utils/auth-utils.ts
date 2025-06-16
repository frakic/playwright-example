import { test, Header } from '@playwright/fixtures';
import { TestUser } from '@playwright/models';
import { LoginPage, IotDashboardPage } from '@playwright/pages';

export const logInAndSaveState = async (
	testUser: TestUser,
	storageStateName: string,
	loginPage: LoginPage,
	header: Header,
	iotDashboardPage: IotDashboardPage
) => {
	await loginPage.goto();
	await loginPage.fillEmail(testUser.email);
	await loginPage.fillPassword(testUser.password);
	await loginPage.clickLoginButton();

	await header.verifyUsername(`${testUser.firstName} ${testUser.lastName}`);

	test.step("Save browser's storage state", async () => {
		process.env[storageStateName] = JSON.stringify(
			await iotDashboardPage.page.context().storageState()
		);
	});
};

export const getStorageState = async (name: string) => {
	if (process.env.TEST_USERS) {
		return JSON.parse(process.env[name]!);
	}
};
