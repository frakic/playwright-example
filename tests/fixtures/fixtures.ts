import { test as base } from '@playwright/test';
import { IotDashboardPage, LoginPage } from '@playwright/pages';
import { Header, testUsers } from '@playwright/fixtures';
import { TestUsers } from '@playwright/models';

export const test = base.extend<{
	iotDashboardPage: IotDashboardPage;
	loginPage: LoginPage;

	header: Header;

	testUsers: TestUsers;
}>({
	iotDashboardPage: async ({ page }, use) => {
		await use(new IotDashboardPage(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},

	header: async ({ page }, use) => {
		await use(new Header(page));
	},

	testUsers: async ({}, use) => {
		// This would be fetched from a secret store in a real-world scenario
		await use(testUsers);
	},
});

export { expect } from '@playwright/test';

/**
 * Decorator function that wraps a page object method in a Playwright `test.step()` call.
 * @param stepName Optional test step name. If omitted, the decorated method's name is used.
 * @returns A function to decorate a test method
 */

export function step(stepName?: string) {
	return function decorator<T extends { constructor: { name: string } }, A extends unknown[], R>(
		method: (this: T, ...args: A) => Promise<R>,
		context: ClassMethodDecoratorContext
	) {
		return function (this: T, ...args: A): Promise<R> {
			const name = `${this.constructor.name}: ${stepName ?? String(context.name)}`;
			return test.step(name, async () => {
				return await method.apply(this, args);
			});
		};
	};
}
