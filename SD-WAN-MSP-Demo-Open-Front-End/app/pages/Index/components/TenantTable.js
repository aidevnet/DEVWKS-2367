import React from 'react';

import "./TenantTable.css";

class TableRowHeading extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const sortOrder = this.props.sortOrder;
		const sortIcon = sortOrder === "asc" ? "arrow_drop_up" :
						 sortOrder === "desc" ? "arrow_drop_down" :
						 "sort";

		return (
			<div className="tenant-table-row">
				<div className="tenant-table-heading first" onClick={this.props.onClick}>
					<i className={"material-icons md-18 sorted"}>{sortIcon}</i>
					Tenant
				</div>
				<div className="tenant-table-heading">Control Status</div>
				<div className="tenant-table-heading">Site Health</div>
				<div className="tenant-table-heading">WAN Edge Health</div>
				<div className="tenant-table-heading">vSmart Status</div>
				<div className="tenant-table-heading last">
					<i className={"material-icons md-18 sorted"}>info</i>
				</div>
			</div>
		)
	}
}

class TableRowData extends React.Component {
	constructor(props) {
		super(props);
	}

	sortByName() {
		return function(a, b) {
			if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
			else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

			return 0;
		}
	}

	render() {
		const {
			sortOrder,
			tenantInfoIdClicked,
			showTenantInfo
		} = this.props;

		const tenantDetails = JSON.parse(JSON.stringify(this.props.tenantDetails));

		if (sortOrder === "asc") tenantDetails.sort(this.sortByName());
		else if (sortOrder === "desc") tenantDetails.sort(this.sortByName()).reverse();

		const tenantDetailsList = tenantDetails.map(function(tenantDetail, index) {
			let icons = {
				controlStatus: null,
				siteHealth: null,
				vEdgesStatus: null,
				vSmartsStatus: null
			};

			Object.keys(icons).forEach(function(key, index) {
				if (tenantDetail[key] === "normal") icons[key] = "check_circle";
				else if (tenantDetail[key] === "warning") icons[key] = "warning";
				else if (tenantDetail[key] === "error") icons[key] = "cancel";
			});

			return (
				<div key={index} className="tenant-table-row tenant-table-row-data">
					<a target="_blank" href={tenantDetail.vmanageIpFormatted} draggable="false">
						<div className="tenant-table-data-cell first">
							<i className="material-icons md-18 link">link</i>
							<div className="hgf">{tenantDetail.name}</div>
						</div>
					</a>
					<div className="tenant-table-data-cell">
						<i className={"material-icons md-18 " + (tenantDetail.controlStatus || "normal")}>
							{icons.controlStatus || "check_circle"}
						</i>
					</div>
					<div className="tenant-table-data-cell">
						<i className={"material-icons md-18 " + (tenantDetail.siteHealth || "normal")}>
							{icons.siteHealth || "check_circle"}
						</i>
					</div>
					<div className="tenant-table-data-cell">
						<i className={"material-icons md-18 " + (tenantDetail.vEdgesStatus || "normal")}>
							{icons.vEdgesStatus || "check_circle"}
						</i>
					</div>
					<div className="tenant-table-data-cell">
						<i className={"material-icons md-18 " + (tenantDetail.vSmartsStatus || "normal")}>
							{icons.vSmartsStatus || "check_circle"}
						</i>
					</div>
					<div className="tenant-table-data-cell last pointer" onClick={(e) => showTenantInfo(e, tenantDetail.id)}>
						<i className="material-icons md-18">
							{tenantInfoIdClicked === tenantDetail.id ? "chevron_right" : "chevron_left"}
						</i>
					</div>
				</div>
			);
		});

		return (
			<div className="tenant-table-data">
				{tenantDetailsList}
				<NewTenantRow
					isNewTenantClicked={this.props.isNewTenantClicked}
					addNew={this.props.addNew}
				/>
			</div>
		);
	}
}

class NewTenantRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tenant-table-row tenant-table-row-data">
				<div className="tenant-table-data-cell first add-new" onClick={this.props.addNew} href="javascript:void(0)" draggable="false">
					Add new tenant...
				</div>
				<div className="tenant-table-data-cell"></div>
				<div className="tenant-table-data-cell"></div>
				<div className="tenant-table-data-cell"></div>
				<div className="tenant-table-data-cell"></div>
				<div className="tenant-table-data-cell last"></div>
			</div>
		);
	}
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortOrder: null
		};

		this.handleHeadingClick = this.handleHeadingClick.bind(this);
	}

    handleHeadingClick(e, sortOrder) {
		this.setState({
			sortOrder: !sortOrder || (sortOrder === "desc") ? "asc" : "desc"
		});
	}

	render() {
		const sortOrder = this.state.sortOrder;
		const tenantInfoIdClicked = this.props.tenantInfoIdClicked;
		const mode = tenantInfoIdClicked === null ? " full-width" : " half-width";

		return (
			<div className={"tenant-table" + mode}>
				<TableRowHeading
					sortOrder={sortOrder}
					onClick={(e) => this.handleHeadingClick(e, sortOrder)}
				/>
				<TableRowData
					isNewTenantClicked={this.props.isNewTenantClicked}
					tenantInfoIdClicked={tenantInfoIdClicked}
					sortOrder={sortOrder}
					tenantDetails={this.props.tenantDetails}
					addNew={this.props.addNew}
					showTenantInfo={this.props.showTenantInfo}
				/>
			</div>
		);
	}
}
