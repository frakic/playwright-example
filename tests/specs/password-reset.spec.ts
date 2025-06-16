import { test } from '@playwright/fixtures';
import { getStorageState } from '@playwright/utils';

test.use({ storageState: await getStorageState('ActiveUser') });

test('allows the user to reset their password', async ({ resetPasswordPage }) => {
	await resetPasswordPage.goto();
	await resetPasswordPage.fillNewPassword('Password123!');
	await resetPasswordPage.fillConfirmPassword('Password123!');
	await resetPasswordPage.clickChangePassword();
});
