import React from 'react';
import {Link} from 'react-router';
import {fetchTenants, fetchControlStatuses, fetchSiteHealths, fetchvEdgesStatuses, fetchvSmartsStatuses, createTenant} from '../../util/API';
import DashboardHeader from "./components/DashboardHeader";
import DashboardDropdown from "./components/DashboardDropdown";
import DashboardMain from "./components/DashboardMain";

import './_index.scss';
import "material-design-icons/iconfont/material-icons.css";

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			tenants: [],
			tenantIps: [],
			tenantDetails: [],
			isDropdownClicked: false,
			isNewTenantClicked: false,
			tenantInfoIdClicked: null,
			connectionError: null
		};

		this.handleDropdownClick = this.handleDropdownClick.bind(this);
		this.handleDropdownExit = this.handleDropdownExit.bind(this);

		this.handleNewTenantClick = this.handleNewTenantClick.bind(this);
		this.handleNewTenantExit = this.handleNewTenantExit.bind(this);

		this.handleTenantInfoClick = this.handleTenantInfoClick.bind(this);

		this.submitNewTenant = this.submitNewTenant.bind(this);
	}

	handleDropdownClick(e) {
		this.setState({
			isDropdownClicked: true
		});
	}

	handleDropdownExit(e) {
		const isDropdownClicked = this.state.isDropdownClicked;

		if (isDropdownClicked) {
			this.setState({
				isDropdownClicked: false
			});
		}
	}

	handleNewTenantClick(e) {
		this.setState({
			isNewTenantClicked: true,
			tenantInfoIdClicked: null	// Close info box ready for new tenant to be added.
		});
	}

	handleNewTenantExit(e) {
		const isNewTenantClicked = this.state.isNewTenantClicked;

		if (isNewTenantClicked) {
			this.setState({
				isNewTenantClicked: false,
				connectionError: null
			});
		}
	}

	handleTenantInfoClick(e, tenantId) {
		if (this.state.tenantDetails[tenantId].loadingCount === 0) {
			this.setState({
				tenantInfoIdClicked: tenantId !== this.state.tenantInfoIdClicked ? tenantId : null
			});
		}
	}

	submitNewTenant(e, state) {
		e.preventDefault();

		if (this.state.tenantIps.includes(state.vmanageIp)) {
			this.setState({
				connectionError: "Cannot add duplicate tenant."
			});
		}
		else {
			createTenant(
				state.tenantName,
				state.vmanageIp,
				state.vmanagePassword,
				state.vmanagePort,
				state.vmanageUsername
			)
			.then((res) => {
				const error = this.getConnectionError(res);

				this.setState({
					connectionError: error
				});

				// If there's no connection error, make the API calls as usual to add new tenant.
				if (!error) this.makeApiCalls();
			})
		}
	}

	getConnectionError(res) {
		if (res.data) return JSON.parse(res.data).error;

		return null;
	}

	statusFromScore(score) {
		if (!score) return "normal";
		else if (score > 0) return "warning";
		else if (score < 0) return "error";
	}

	updateTenant(toUpdateStatus, toUpdateInfo, score, info, tenantIndex) {
		let tenantDetails = [...this.state.tenantDetails];
		const status = this.statusFromScore(score);

		tenantDetails[tenantIndex][toUpdateStatus] = status;
		tenantDetails[tenantIndex][toUpdateInfo] = info;
		tenantDetails[tenantIndex].loadingCount--;
		this.setState({tenantDetails});
	}

	makeApiCalls() {
		fetchTenants()
		.then((res) => {
			console.log("Fetching and computing list of tenants...");

			this.setState({
				tenants: res.data,
				tenantIps: [],
				tenantDetails: []
			});

			for (let i = 0; i < res.data.length; i++) {
				const name = res.data[i].tenantName;
				const vmanageIp = res.data[i].vmanageIp;
				const vmanagePort = res.data[i].port;
				const vmanageIpFormatted = "https://" + vmanageIp + ":" + vmanagePort;

				this.setState({
					tenantIps: [...this.state.tenantIps, vmanageIp],
					tenantDetails: [...this.state.tenantDetails, {

						// 4 API calls to make per tenant.
						loadingCount: 4,
						id: i,
						name: name,
						vmanageIp: vmanageIp,
						vmanageIpFormatted: vmanageIpFormatted,
						controlStatus: null,
						controlDetail: null,
						siteHealth: null,
						siteHealthDetail: null,
						vEdgesStatus: null,
						vEdgesDetail: null,
						vSmartsStatus: null,
						vSmartsDetail: null
					}]
				});
			}

			fetchControlStatuses()
			.then((res2) => {
				console.log("Fetching and computing Control Statuses...");

				let score = 0;
				let info = [];
				let tenantIndex = 0;
				let resIndex = 0;

				while (
					tenantIndex < this.state.tenantDetails.length
					&& resIndex < res2.data.length
				) {

					if (res2.data[resIndex].vmanageIp === this.state.tenantDetails[tenantIndex].vmanageIp) {
						const connsExpected = res2.data[resIndex]["expected-control-connections"];
						const connsUp = res2.data[resIndex]["vsmart-control-connections"];

						if (connsExpected && !connsUp) score = -1;
						else if (connsUp && connsUp < connsExpected && score >= 0) score++;

						info.push(res2.data[resIndex]);
						resIndex++;
					}
					else {
						this.updateTenant(
							"controlStatus",
							"controlDetail",
							score,
							info,
							tenantIndex
						);

						score = 0;
						info = [];
						tenantIndex++;
					}
				}

				// Update the final tenant now that loop has ended.
				this.updateTenant(
					"controlStatus",
					"controlDetail",
					score,
					info,
					tenantIndex
				);
			})

			fetchSiteHealths()
			.then((res3) => {
				console.log("Fetching and computing Site Healths...");

				let score = 0;
				let info = [];
				let tenantIndex = 0;
				let resIndex = 0;

				while (
					tenantIndex < this.state.tenantDetails.length
					&& resIndex < res3.data.length
				) {
					if (res3.data[resIndex].vmanageIp === this.state.tenantDetails[tenantIndex].vmanageIp) {
						const sessionsTotal = res3.data[resIndex].bfdSessions;
						const sessionsUp = res3.data[resIndex].bfdSessionsUp;

						if (!sessionsUp) score = -1;
						else if (sessionsUp !== Number(sessionsTotal) && score >= 0) score++;

						info.push(res3.data[resIndex]);
						resIndex++;
					}
					else {
						this.updateTenant(
							"siteHealth",
							"siteHealthDetail",
							score,
							info,
							tenantIndex
						);

						score = 0;
						info = [];
						tenantIndex++;
					}
				}

				// Update the final tenant now that loop has ended.
				this.updateTenant(
					"siteHealth",
					"siteHealthDetail",
					score,
					info,
					tenantIndex
				);
			})

			fetchvEdgesStatuses()
			.then((res4) => {
				console.log("Fetching and computing vEdges...");

				let index = 0;

				while (index < res4.data.length) {
					if (res4.data[index].vmanageIp === this.state.tenantDetails[index].vmanageIp) {
						const vEdgesDetail = {
							count: res4.data[index].data[0].count,
							normal: res4.data[index].data[0].normal,
							warning: res4.data[index].data[0].warning,
							error: res4.data[index].data[0].error
						};

						let tenantDetails = [...this.state.tenantDetails];

						tenantDetails[index].vEdgesDetail = vEdgesDetail;
						tenantDetails[index].vEdgesStatus = vEdgesDetail.error ? "error" : vEdgesDetail.warning ? "warning" : "normal";
						tenantDetails[index].loadingCount--;
						this.setState({tenantDetails});
						index++;
					}
				}
			})

			fetchvSmartsStatuses()
			.then((res5) => {
				console.log("Fetching and computing vSmarts...");

				let index = 0;

				while (index < res5.data.length) {
					if (res5.data[index].vmanageIp === this.state.tenantDetails[index].vmanageIp) {
						const vSmartsDetail = {
							count: res5.data[index].data[0].count,
							normal: res5.data[index].data[0].normal,
							warning: res5.data[index].data[0].warning,
							error: res5.data[index].data[0].error
						};

						let tenantDetails = [...this.state.tenantDetails];

						tenantDetails[index].vSmartsDetail = vSmartsDetail;
						tenantDetails[index].vSmartsStatus = vSmartsDetail.error ? "error" : vSmartsDetail.warning ? "warning" : "normal";
						tenantDetails[index].loadingCount--;
						this.setState({tenantDetails});
						index++;
					}
				}
			})
		})
	}

	componentDidMount() {
		this.makeApiCalls();
	}

	render() {
		const {
			tenants,
			tenantDetails,
			isDropdownClicked,
			isNewTenantClicked,
			tenantInfoIdClicked,
			isLoading,
			connectionError
		} = this.state;

		return (
			<div
				className="dashboard-container"
				onClick={() => {
					this.handleDropdownExit();
					this.handleNewTenantExit()
				}}
			>
				<DashboardHeader
					isDropdownClicked={isDropdownClicked}
					isNewTenantClicked={isNewTenantClicked}
					onClick={this.handleDropdownClick}
				/>
				<DashboardDropdown
					isDropdownClicked={isDropdownClicked}
					tenantDetails={tenantDetails}
				/>
				<DashboardMain
					isNewTenantClicked={isNewTenantClicked}
					tenantInfoIdClicked={tenantInfoIdClicked}
					tenants={tenants}
					tenantDetails={tenantDetails}
					isLoading={isLoading}
					connectionError={connectionError}
					submitNewTenant={this.submitNewTenant}
					addNew={this.handleNewTenantClick}
					showTenantInfo={this.handleTenantInfoClick}
				/>
			</div>
		);
	}
}
