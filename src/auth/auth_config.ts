import type { Auth0ClientOptions } from '@auth0/auth0-spa-js';

const resources = [
	{
		name: 'project',
		operations: ['read', 'write', 'update', 'delete']
	},
	{
		name: 'company',
		operations: ['read', 'write', 'update', 'delete']
	},
	{
		name: 'people',
		operations: ['read', 'write', 'update', 'delete']
	}
];

function getResourceScopes() {
	return resources
		.map((resource) => {
			return resource.operations.map((op) => `${op}:${resource.name}`).join(' ');
		})
		.join(' ');
}

const config: Auth0ClientOptions = {
	domain: 'teamly.us.auth0.com',
	clientId: 'InPTCm0pFBIovGrvm0I3qJGs5XnVgJV5',
	authorizationParams: {
		audience: 'projectmanagement',
		scope: `openid profile email ${getResourceScopes()}`
	}
};

export default config;
