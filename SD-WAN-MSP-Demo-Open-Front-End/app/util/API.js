import axios from "axios";

export function createTenant(tenantName, vmanageIp, vmanagePassword, vmanagePort, vmanageUsername) {
	const url = `${CONFIG["API_SERVER"]}/v1/operation/create_tenant`;

	return axios({
		method: "post",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			tenantName: tenantName,
			vmanageIp: vmanageIp,
			vmanagePassword: vmanagePassword,
			port: vmanagePort,
			vmanageUsername: vmanageUsername
		}
	});
}

export function fetchTenants() {
	const url = `${CONFIG["API_SERVER"]}/v1/info/tenants`;

	return axios({
		method: "get",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function fetchControlStatuses() {
	const url = `${CONFIG["API_SERVER"]}/v1/info/control_status`;

	return axios({
		method: "get",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function fetchSiteHealths() {
	const url = `${CONFIG["API_SERVER"]}/v1/info/site_health`;

	return axios({
		method: "get",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function fetchvEdgesStatuses() {
	const url = `${CONFIG["API_SERVER"]}/v1/info/vedges_status`;

	return axios({
		method: "get",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function fetchvSmartsStatuses() {
	const url = `${CONFIG["API_SERVER"]}/v1/info/vsmarts_status`;

	return axios({
		method: "get",
		baseURL: url,
		timeout: null,
		headers: {
			"Content-Type": "application/json"
		}
	})
}
