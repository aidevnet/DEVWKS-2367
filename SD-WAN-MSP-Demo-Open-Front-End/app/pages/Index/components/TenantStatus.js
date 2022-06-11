import React from 'react';
import TenantCount from "./TenantCount";
import TenantCards from "./TenantCards";

import "./TenantStatus.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tenant-status">
				<TenantCount
					tenants={this.props.tenants}
				/>
				<TenantCards
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
			</div>
		);
	}
}
