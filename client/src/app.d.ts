declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		interface Locals {
			user: UserDto | undefined;
			accessToken: string | undefined;
			lastPage: string;
		}
	}
}

export type KeyValueObject = {
	[key: string]: string;
};
export type UserDto = {
	id: string;
	email: string;
	displayName: string;
	avatar: string;
	role: string;
	status: number;
	loginFrom: string;
};
export {};
