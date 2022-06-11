import React from 'react';
import TenantStatus from "./TenantStatus";
import TenantTableSection from "./TenantTableSection";

import "./DashboardOverview.css";

class NewTenantBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tenantName: "",
			vmanageIp: "",
			vmanagePassword: "",
			vmanagePort: "8443",
			vmanageUsername: ""
		};

		this.handleNewTenantBoxClick = this.handleNewTenantBoxClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleNewTenantBoxClick(e) {
		e.stopPropagation();
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	getDefaultPort() {
		return "8443";
	}

	render() {
		const defaultPort = this.getDefaultPort();
		const connectionError = this.props.connectionError;

		if (!this.props.isNewTenantClicked) return null;

		return (
			<div className="modal">
				<div className="new-tenant-box" onClick={e => this.handleNewTenantBoxClick(e)}>
					<form className="new-tenant-form">
						<div className="new-tenant-form-element">
							<label className="new-tenant-form-label" htmlFor="tenantName">
								Tenant Name
							</label>
							<input
								type="text"
								placeholder="sandbox"
								autoComplete="name"
								id="tenantName"
								name="tenantName"
								onChange={this.handleInputChange}
							></input>
							<br />
						</div>
						<div className="new-tenant-form-element">
							<label className="new-tenant-form-label" htmlFor="vmanageIp">
								vManage IP
							</label>
							<input
								type="text"
								placeholder="sandboxsdwan.cisco.com"
								autoComplete="url"
								id="vmanageIp"
								name="vmanageIp"
								onChange={this.handleInputChange}
							></input>
							<br />
						</div>
						<div className="new-tenant-form-element">
							<label className="new-tenant-form-label" htmlFor="vmanagePassword">
								vManage Password
							</label>
							<input
								type="password"
								placeholder="password"
								autoComplete="current-password"
								id="vmanagePassword"
								name="vmanagePassword"
								onChange={this.handleInputChange}
							></input>
							<br />
						</div>
						<div className="new-tenant-form-element">
							<label className="new-tenant-form-label" htmlFor="vmanagePort">
								vManage Port
							</label>
							<input
								type="text"
								placeholder={defaultPort}
								defaultValue={defaultPort}
								autoComplete="username"
								id="vmanagePort"
								name="vmanagePort"
								onChange={this.handleInputChange}
							></input>
							<br />
						</div>
						<div className="new-tenant-form-element">
							<label className="new-tenant-form-label" htmlFor="vmanageUsername">
								vManage Username
							</label>
							<input
								type="text"
								placeholder="cisco"
								autoComplete="username"
								id="vmanageUsername"
								name="vmanageUsername"
								onChange={this.handleInputChange}
							></input>
							<br />
						</div>
						<input
							type="submit"
							defaultValue="Add Tenant"
							onClick={e => {this.props.submitNewTenant(e, this.state)}}
						>
						</input>
					</form>
					<div className="new-tenant-form-error">
						{connectionError}
					</div>
				</div>
			</div>
		);
	}
}

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard-overview">
				<NewTenantBox
					submitNewTenant={this.props.submitNewTenant}
					isNewTenantClicked={this.props.isNewTenantClicked}
					connectionError={this.props.connectionError}
				/>
				<TenantStatus
					tenants={this.props.tenants}
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
				<TenantTableSection
					isNewTenantClicked={this.props.isNewTenantClicked}
					tenantInfoIdClicked={this.props.tenantInfoIdClicked}
					tenants={this.props.tenants}
					tenantDetails={this.props.tenantDetails}
					addNew={this.props.addNew}
					showTenantInfo={this.props.showTenantInfo}
				/>
			</div>
		);
	}
}
