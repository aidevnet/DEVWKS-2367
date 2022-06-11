import React from 'react';

import "./DashboardDropdown.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const isDropdownClicked = this.props.isDropdownClicked;
		const tenantDetails = this.props.tenantDetails;

		const tenantDetailsList = tenantDetails.map(function(tenantDetail, index) {
			return (
				<a
					className="text-decoration-none"
					key={index}
					target="_blank"
					href={tenantDetail.vmanageIpFormatted}
				>
					<div className="dropdown-menu-item">
						{tenantDetail.name}
					</div>
				</a>
			)
		});

		const backupTenantDetailsList = (
			<a
				className="text-decoration-none"
				key="backup"
				href="javascript:void(0)"
			>
				<div className="dropdown-menu-item">
					&nbsp;
				</div>
			</a>
		);
		
		const dropdownMenu = isDropdownClicked ? (
			<div className="dropdown-menu-container">
				<div className="dropdown-menu-arrow"></div>
				<div className="dropdown-menu-menu">
					{tenantDetailsList.length ? tenantDetailsList : backupTenantDetailsList}
				</div>
			</div>
		) : null;

		return dropdownMenu;
	}
}