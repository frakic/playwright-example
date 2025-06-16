export interface TestUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export type TestUsers = Record<string, TestUser>;
