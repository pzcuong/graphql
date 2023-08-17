import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { checkValidToken, getProfile, refreshTokens } from '$helpers/auth';
export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.accessToken = event.cookies.get('accessToken');
		if (!event.locals.accessToken) {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
			event.locals.lastPage = event.url.pathname;

			return await resolve(event);
		}

		// const accessToken = event.locals.accessToken;
		// const isAccessTokenValid = await checkValidToken(accessToken);
		// if (isAccessTokenValid.status === false) {
		// 	if (isAccessTokenValid.message === JwtError.ACCESS_TOKEN_EXPIRED) {
		// 		const refreshToken = event.cookies.get('refreshToken');
		// 		const isRefreshTokenValid = await checkValidToken(refreshToken);
		// 		if (isRefreshTokenValid.status === false) {
		// 			event.locals.user = undefined;
		// 			event.locals.accessToken = undefined;
		// 			event.locals.lastPage = event.url.pathname;
		// 			event.cookies.delete('accessToken', {
		// 				path: '/'
		// 			});
		// 			event.cookies.delete('refreshToken', {
		// 				path: '/'
		// 			});

		// 			return await resolve(event);
		// 		}

		// 		const response = await refreshTokens(refreshToken);
		// 		if (!response) {
		// 			event.locals.user = undefined;
		// 			event.locals.accessToken = undefined;
		// 			event.locals.lastPage = event.url.pathname;
		// 			event.cookies.delete('accessToken', {
		// 				path: '/'
		// 			});
		// 			event.cookies.delete('refreshToken', {
		// 				path: '/'
		// 			});

		// 			return await resolve(event);
		// 		} else if (response.statusCode === 201) {
		// 			event.cookies.set('accessToken', response.data.accessToken, {
		// 				path: '/'
		// 			});
		// 			event.cookies.set('refreshToken', response.data.refreshToken, {
		// 				path: '/'
		// 			});
		// 			event.locals.accessToken = event.cookies.get('accessToken');
		// 			event.locals.user = await getProfile(event.locals.accessToken);
		// 			if (!event.locals.user) {
		// 				event.locals.user = undefined;
		// 				event.locals.accessToken = undefined;
		// 				event.cookies.delete('accessToken', {
		// 					path: '/'
		// 				});
		// 				event.cookies.delete('refreshToken', {
		// 					path: '/'
		// 				});
		// 				event.locals.lastPage = event.url.pathname;
		// 			}

		// 			return await resolve(event);
		// 		}
		// 	} else {
		// 		event.locals.user = undefined;
		// 		event.locals.accessToken = undefined;
		// 		event.cookies.delete('accessToken', {
		// 			path: '/'
		// 		});
		// 		event.cookies.delete('refreshToken', {
		// 			path: '/'
		// 		});

		// 		return await resolve(event);
		// 	}
		// }

		if (event.locals.user !== undefined) {
			return await resolve(event);
		}

		event.locals.user = await getProfile(event.locals.accessToken);
		if (!event.locals.user) {
			event.locals.user = undefined;
			event.locals.accessToken = undefined;
			event.cookies.delete('accessToken', {
				path: '/'
			});
			event.cookies.delete('refreshToken', {
				path: '/'
			});
			event.locals.lastPage = event.url.pathname;
		}

		return await resolve(event);
	} catch (err: any) {
		event.locals.user = undefined;
		event.locals.accessToken = undefined;
		event.locals.lastPage;

		return await resolve(event);
	}
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }): Promise<Response> => {
	const token = event.locals.accessToken;
	if (token) {
		request.headers.set('Authorization', `Bearer ${token}`);
	}

	return fetch(request);
};
export const handleError: HandleServerError = async ({ event }) => {
	if (event.route.id === null) {
		return {
			code: 404,
			message: 'Page not found'
		};
	}
	return {
		code: 500,
		message: 'Internal server error'
	};
};
