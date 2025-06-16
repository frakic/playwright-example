import { Locator, Page } from '@playwright/test';
import { expect, step } from '@playwright/fixtures';

export class LoginPage {
	readonly page: Page;

	readonly emailInput: Locator;
	readonly passwordInput: Locator;

	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.emailInput = this.page.getByRole('textbox', { name: 'email' });
		this.passwordInput = this.page.getByRole('textbox', { name: 'password' });

		this.loginButton = this.page.getByRole('button', { name: 'Log In' });
	}

	@step('Go to the Login page')
	async goto() {
		await this.page.goto('auth/login');
	}

	@step('Fill the Email input')
	async fillEmail(email: string) {
		await expect(this.emailInput).toBeVisible();
		await this.emailInput.fill(email);
		await expect(this.emailInput).toHaveValue(email);
		await expect(this.emailInput).toContainClass('status-success');
	}

	@step('Fill the Password input')
	async fillPassword(password: string) {
		await expect(this.passwordInput).toBeVisible();
		await this.passwordInput.fill(password);
		await expect(this.passwordInput).toHaveValue(password);
		await expect(this.emailInput).toContainClass('status-success');
	}

	@step('Click the Log In button')
	async clickLoginButton() {
		await expect(this.loginButton).toBeEnabled();
		await this.loginButton.click();
		await expect(this.page).toHaveURL(/iot-dashboard/);
	}
}
