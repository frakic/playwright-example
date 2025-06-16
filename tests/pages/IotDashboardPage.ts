import { Page } from '@playwright/test';

export class IotDashboardPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
