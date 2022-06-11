import React from 'react';
import DashboardOverview from "./DashboardOverview";
import DashboardOverthrow from "./DashboardOverthrow";

import "./DashboardMain.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!nextProps.isLoading) return true;

		return false;
	}

	render() {
		return (
            <div className="dashboard-main">
            	<DashboardOverview 
            		isNewTenantClicked={this.props.isNewTenantClicked}
            		tenantInfoIdClicked={this.props.tenantInfoIdClicked}
            		tenants={this.props.tenants}
					tenantDetails={this.props.tenantDetails}
					isLoading={this.props.isLoading}
					connectionError={this.props.connectionError}
					onClick={this.props.onClick}
					submitNewTenant={this.props.submitNewTenant}
					addNew={this.props.addNew}
					showTenantInfo={this.props.showTenantInfo}
            	/>
            	<DashboardOverthrow />
            </div>
		);
	}
}