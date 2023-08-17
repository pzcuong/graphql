import { VITE_API_URL } from '$env/static/private';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client/core';

const httpLink = new HttpLink({
	uri: VITE_API_URL
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export default client;

export const checkValidToken = async (token: string | undefined) => {
	if (!token) {
		return {
			status: false,
			message: 'Token is not valid'
		};
	}

	const response = await gql`
        query {
            checkValidToken(token: "${token}") {
                status
                message
            }
        }
    `;
	const { data } = await response.json();

	// const response = await fetch(`${VITE_API_URL}/auth/check-valid`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({
	// 		token
	// 	})
	// });

	// const { data } = await response.json();
	if (data.status === false) {
		// if (data.message === JwtError.ACCESS_TOKEN_EXPIRED) {
		// 	return {
		// 		status: false,
		// 		message: JwtError.ACCESS_TOKEN_EXPIRED
		// 	};
		// }
		return {
			status: false,
			message: data.message
		};
	} else {
		return {
			status: true,
			message: data.message
		};
	}
};

export const getProfile = async (token: string | undefined) => {
	if (!token) {
		return undefined;
	}

	const response = await fetch(`${VITE_API_URL}/auth/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const result = await response.json();
	if (response.status === 200) {
		return result.data;
	}

	return undefined;
};

export const refreshTokens = async (refreshToken: string | undefined) => {
	if (!refreshToken) {
		return undefined;
	}

	const response = await fetch(`${VITE_API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refreshToken
		})
	});
	const result = await response.json();
	if (response.status === 201) {
		return result;
	}

	return undefined;
};
