import React from 'react';

import "./TenantCount.css";

class Count extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const tenantCount = this.props.tenantCount;

		return <div className="tenant-count-title-count">{tenantCount}</div>;
	}
}

class Text extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const tenantCount = this.props.tenantCount;

		return (
			<div className="tenant-count-title-text">{tenantCount === 1 ? "Tenant" : "Tenants"}</div>
		);
	}
}

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	getTenantCount() {
		return this.props.tenants ? this.props.tenants.length : 0;
	}

	render() {
		const tenantCount = this.getTenantCount();

		return (
			<div className="tenant-count">
				<Count tenantCount={tenantCount} />
				<Text tenantCount={tenantCount} />
			</div>
		);
	}
}