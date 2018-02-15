'use strict';

export function authReducer(state = { user: { loggedin: null } }, action) {
	switch (action.type) {
		case 'signUp':
			localStorage.setItem('token', action.payload.token);
			return {
				user: action.payload.user,
				loggedin: true
			};
			break;

		case 'signIn':
			localStorage.setItem('token', action.payload.token);
			return {
				user: action.payload.user,
				loggedin: true
			};
			break;

		case 'logout':
			localStorage.removeItem('token');
			return {
				user: {},
				loggedin: false
			};
			break;

		case 'getAuth':
			return {
				user: action.payload,
				loggedin: true
			};
			break;
		case 'getAuthRejected':
			return {
				user: action.payload,
				loggedin: false
			};
			break;
	}

	return state;
}
