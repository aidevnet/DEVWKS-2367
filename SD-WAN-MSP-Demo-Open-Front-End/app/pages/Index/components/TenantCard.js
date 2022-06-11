import React from 'react';
import TenantCardChart from './TenantCardChart';

import "./TenantCard.css";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	getCardTitle(cardType) {
		if (cardType === "controlStatus") return "Control Status";
		if (cardType === "siteHealth") return "Site Health";
		if (cardType === "vEdgesStatus") return "WAN Edge Health";
		if (cardType === "vSmartsStatus") return "vSmart Status";

		return null;
	}

	render() {
		const {cardType, tenantDetails, isLoading} = this.props;
		const cardTitle = this.getCardTitle(cardType);
		let cardStatus = {
			normal: 0,
			warning: 0,
			error: 0
		};

		for (let i = 0; i < tenantDetails.length; i++) {
			if (tenantDetails[i][cardType] === "normal") cardStatus.normal++;
			else if (tenantDetails[i][cardType] === "warning") cardStatus.warning++;
			else if (tenantDetails[i][cardType] === "error") cardStatus.error++;
		}

		return (
			<div className="tenant-card">
				<TenantCardChart
					cardStatus={cardStatus}
				/>
				<div className="label-wrapper">
					<div className="label-title">{cardTitle}</div>
					<div className="label-legend">
						<div className="label-legend-entry">
							<div className="label-legend-entry-key bullet-normal"></div>
							{
								isLoading ? <div className="label-legend-entry-value">Loading...</div> :
								<div className="label-legend-entry-value">
									<span className="amount">{cardStatus.normal}</span>
									{cardStatus.normal === 1 ? " Tenant" : " Tenants"}
								</div>
							}
						</div>
						<div className="label-legend-entry">
							<div className="label-legend-entry-key bullet-warning"></div>
							{
								isLoading ? <div className="label-legend-entry-value">Loading...</div> :
								<div className="label-legend-entry-value">
									<span className="amount">{cardStatus.warning}</span>
									{cardStatus.warning === 1 ? " Tenant" : " Tenants"}
								</div>
							}
						</div>
						<div className="label-legend-entry">
							<div className="label-legend-entry-key bullet-error"></div>
							{
								isLoading ? <div className="label-legend-entry-value">Loading...</div> :
								<div className="label-legend-entry-value">
									<span className="amount">{cardStatus.error}</span>
									{cardStatus.error === 1 ? " Tenant" : " Tenants"}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}