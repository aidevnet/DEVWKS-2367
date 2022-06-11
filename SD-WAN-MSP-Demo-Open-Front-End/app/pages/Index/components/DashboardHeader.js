import React from 'react';

import "./DashboardHeader.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const mode = this.props.isDropdownClicked ? "active" : "inactive";

		return (
			<div className="dashboard-header">
				<div className="dashboard-header-container">
					<div className="dashboard-header-left">
						<i className="material-icons md-18 dashboard">dashboard</i>
						<div className="dashboard-title">SD-WAN MSP DASHBOARD</div>
					</div>
					<div className="dashboard-header-right">
						<div className="dashboard-label">
							<i className="material-icons md-18 normal">check_circle</i>
							<div className="dashboard-label-title">Normal</div>
						</div>
						<div className="dashboard-label">
							<i className="material-icons md-18 warning">warning</i>
							<div className="dashboard-label-title">Warning</div>
						</div>
						<div className="dashboard-label">
							<i className="material-icons md-18 error">cancel</i>
							<div className="dashboard-label-title">Error</div>
						</div>
						<div className="dashboard-dropdown-container">
							<a className="dropdown-button" onClick={this.props.onClick} href="javascript:void(0)" draggable="false"><i className={"material-icons md-18 " + mode}>arrow_drop_down_circle</i></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}