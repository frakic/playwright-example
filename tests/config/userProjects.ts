import { UserProject } from '@playwright/models';

export const userProjects: UserProject[] = [
	{
		name: 'active-user',
		dependencies: ['active-user-setup'],
		testMatch: [],
	},
	{
		name: 'public',
		testMatch: [],
	},
];
