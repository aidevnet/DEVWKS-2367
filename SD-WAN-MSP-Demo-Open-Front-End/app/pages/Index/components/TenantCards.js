import React from 'react';
import TenantCard from "./TenantCard";

import "./TenantCards.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tenant-cards">
				<TenantCard
					cardType="controlStatus"
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
				<TenantCard
					cardType="siteHealth"
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
				<TenantCard
					cardType="vEdgesStatus"
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
				<TenantCard
					cardType="vSmartsStatus"
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
			</div>
		);
	}
}
