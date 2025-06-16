import { Locator, Page } from '@playwright/test';
import { expect, step } from '@playwright/fixtures';

export class Header {
	readonly page: Page;

	readonly username: Locator;

	constructor(page: Page) {
		this.page = page;

		this.username = this.page.locator('ngx-header').locator('.user-name');
	}

	@step('Verify username')
	async verifyUsername(expectedUsername: string) {
		await expect(this.username).toContainText(expectedUsername);
	}
}
