import config from '../worker.config';

interface Env {
	API_TOKEN: string;
	ACCOUNT_ID: string;
}

interface DeploymentsToDelete {
	project?: {
		name: string;
		count: number;
		deployments: string[];
	};
}
export default <ExportedHandler<Env>>{
	async scheduled(event, env, ctx) {
		console.log('Started scheduled event...' + new Date().toUTCString());
		const init = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `Bearer ${env.API_TOKEN}`,
			},
		};

		const expirationMilliseconds = config.expirationDays * 24 * 60 * 60 * 1000;
		const now = Date.now();

		for (const project of config.projects) {
			console.log(project);
			const endpoint = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/pages/projects/${project}/deployments`;

			const response = await fetch(endpoint, init);
			const deployments: any = await response.json();

			for (const deployment of deployments.result) {
				const deploymentAge = now - new Date(deployment.created_on).getTime();
				// Check if the deployment was created within the last x days (as defined by `expirationDays` above)
				if (deploymentAge > expirationMilliseconds) {
					console.log(
						`Deleting deployment: ${deployment.environment} - [${deployment.deployment_trigger.metadata.branch}][${deployment.deployment_trigger.metadata.commit_message}]@${deployment.url} (${deployment.id})`,
					);
					/*
					await fetch(`${endpoint}/${deployment.id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
							Authorization: `Bearer ${env.API_TOKEN}`,
						},
					});
					*/
				}
			}
		}
	},
};
