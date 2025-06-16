import { Locator, Page } from '@playwright/test';
import { expect, step } from '@playwright/fixtures';

export class ResetPasswordPage {
	readonly page: Page;

	readonly newPasswordInput: Locator;
	readonly confirmPasswordInput: Locator;

	readonly changePasswordButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.newPasswordInput = this.page.getByRole('textbox', { name: 'New Password' });
		this.confirmPasswordInput = this.page.getByRole('textbox', { name: 'Confirm Password' });

		this.changePasswordButton = this.page.getByRole('button', { name: 'Change password' });
	}

	@step('Go to the Reset password page')
	async goto() {
		await this.page.goto('auth/reset-password');
	}

	@step('Fill the New password input')
	async fillNewPassword(password: string) {
		await expect(this.newPasswordInput).toBeVisible();
		await this.newPasswordInput.fill(password);
		await expect(this.newPasswordInput).toContainClass('status-success');
	}

	@step('Fill the Confirm password input')
	async fillConfirmPassword(password: string) {
		await expect(this.confirmPasswordInput).toBeVisible();
		await this.confirmPasswordInput.fill(password);
		await this.changePasswordButton.focus();
		await expect(this.confirmPasswordInput).toContainClass('status-success');
	}

	@step('Click the Change password button')
	async clickChangePassword() {
		await expect(this.changePasswordButton).toBeEnabled();
		await this.changePasswordButton.click();
		await expect(this.page).toHaveURL(/iot-dashboard/);
	}
}
