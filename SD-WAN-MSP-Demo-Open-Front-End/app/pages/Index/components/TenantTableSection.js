import React from 'react';
import TenantTable from "./TenantTable";
import TenantInfoBox from "./TenantInfoBox";

import "./TenantTableSection.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tenant-table-section">
				<TenantTable
					isNewTenantClicked={this.props.isNewTenantClicked}
					tenantInfoIdClicked={this.props.tenantInfoIdClicked}
					tenants={this.props.tenants}
					tenantDetails={this.props.tenantDetails}
					addNew={this.props.addNew}
					showTenantInfo={this.props.showTenantInfo}
					isLoading={this.props.isLoading}
				/>
				<TenantInfoBox
					tenantInfoIdClicked={this.props.tenantInfoIdClicked}
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
				/>
			</div>
		);
	}
}
