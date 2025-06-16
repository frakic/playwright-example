import { SetupProject } from '@playwright/models';

export const setupProjects: SetupProject[] = [
	{
		name: 'active-user-setup',
		testMatch: 'setup/active-user.setup.ts',
	},
];
