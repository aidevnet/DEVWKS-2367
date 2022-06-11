import React from 'react';

import "./TenantInfoBox.css";

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hidden: true
		};
	}

	getTenant(tenantDetails, tenantInfoIdClicked) {
		return (
			tenantDetails[tenantDetails.findIndex(
				tenantDetail => tenantDetail.id === tenantInfoIdClicked
			)]
		);
	}

	getTenantInfoCounts(tenantSelected, infoType) {
		let counts = {
			normal: 0,
			warning: 0,
			error: 0
		};

		if (infoType === "controlDetail") {
			for (let i = 0; i < tenantSelected.controlDetail.length; i++) {
				const connsExpected = tenantSelected.controlDetail[i]["expected-control-connections"];
				const connsUp = tenantSelected.controlDetail[i]["vsmart-control-connections"];

				if (connsExpected && !connsUp) counts.error++;
				else if (connsUp && connsUp < connsExpected) counts.warning++;
				else counts.normal++;
			}
		}
		else if (infoType === "siteHealthDetail") {
			for (let i = 0; i < tenantSelected.siteHealthDetail.length; i++) {
				const sessionsTotal = Number(tenantSelected.siteHealthDetail[i]["bfdSessions"]);
				const sessionsUp = tenantSelected.siteHealthDetail[i]["bfdSessionsUp"];

				if (!sessionsUp) counts.error++;
				else if (sessionsUp !== Number(sessionsTotal)) counts.warning++;
				else counts.normal++;
			}
		}
		else if (infoType === "vEdgesDetail") {
			counts = {
				normal: tenantSelected.vEdgesDetail.normal,
				warning: tenantSelected.vEdgesDetail.warning,
				error: tenantSelected.vEdgesDetail.error
			};
		}
		else if (infoType === "vSmartsDetail") {
			counts = {
				normal: tenantSelected.vSmartsDetail.normal,
				warning: tenantSelected.vSmartsDetail.warning,
				error: tenantSelected.vSmartsDetail.error
			};
		}

		return counts;
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.tenantInfoIdClicked === null
			&& prevProps.tenantInfoIdClicked !== null
		) {
			this.timeoutId = setTimeout(function() {
				this.setState({
					hidden: true
				});
			}.bind(this), 1000);
		}
		else if (
			this.props.tenantInfoIdClicked !== null
			&& prevProps.tenantInfoIdClicked === null
		) {
			this.setState({
				hidden: false
			});
		}
	} 

	componentWillUnmount() {
		if (this.timeoutId) clearTimeout(this.timeoutId);
	}

	render() {
		const {
			tenantDetails,
			tenantInfoIdClicked
		} = this.props;

		const tenantSelected = this.getTenant(tenantDetails, tenantInfoIdClicked) || null;

		const counts = {
			controlDetail: tenantSelected ? this.getTenantInfoCounts(tenantSelected, "controlDetail") : null,
			siteHealthDetail: tenantSelected ? this.getTenantInfoCounts(tenantSelected, "siteHealthDetail") : null,
			vEdgesDetail: tenantSelected ? this.getTenantInfoCounts(tenantSelected, "vEdgesDetail") : null,
			vSmartsDetail: tenantSelected ? this.getTenantInfoCounts(tenantSelected, "vSmartsDetail") : null
		};

		const mode = tenantInfoIdClicked === null ? " inactive" : " active";
		const hidden = this.state.hidden ? " hidden" : "";

		return (
			<div
				className={
					"tenant-info-box"
					+ mode
					+ hidden
				}
			>
				<div className="tenant-info-box-row first">
					<div className="tenant-info-box-summary">
						<div className="tenant-info-box-summary-title">
							{tenantSelected ? tenantSelected.name : "Tenant"}
						</div>
					</div>
				</div>
				<div className="tenant-info-box-row">
					<div className="tenant-info-box-item">
						<div className="tenant-info-box-title">
							{
								"Control Status (Total: "
								+ (tenantSelected ? tenantSelected.controlDetail.length : 0)
								+ ")"
							}
						</div>
						<div className="tenant-info-box-stats-container">
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.controlDetail
											&& counts.controlDetail.normal
											? " normal"
											: " zero"
										)
									}
								>
									{counts.controlDetail ? counts.controlDetail.normal : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Control Up
								</div>
							</div>
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.controlDetail
											&& counts.controlDetail.warning
											? " warning"
											: " zero"
										)
									}
								>
									{counts.controlDetail ? counts.controlDetail.warning : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Partial
								</div>
							</div>
							<div className="tenant-info-box-stats-item last">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.controlDetail
											&& counts.controlDetail.error
											? " error"
											: " zero"
										)
									}
								>
									{counts.controlDetail ? counts.controlDetail.error : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Control Down
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="tenant-info-box-row">
					<div className="tenant-info-box-item">
						<div className="tenant-info-box-title">
							{
								"Site Health (Total: "
								+ (tenantSelected ? tenantSelected.siteHealthDetail.length : 0)
								+ ")"
							}
						</div>
						<div className="tenant-info-box-stats-container-col">
							<div className="tenant-info-box-stats-item-col">
								<div className="tenant-info-box-stats-item-text-col">
									<i className="material-icons md-18 normal">check_circle</i>
									Full Connectivity
								</div>
								<div
									className={"tenant-info-box-stats-item-number-col"}
								>
									{
										(counts.siteHealthDetail ? counts.siteHealthDetail.normal : 0)
										+ (
											counts.siteHealthDetail
											&& counts.siteHealthDetail.normal === 1
											? " site"
											: " sites"
										)
									}
								</div>
							</div>
							<div className="tenant-info-box-stats-item-col">
								<div className="tenant-info-box-stats-item-text-col">
									<i className="material-icons md-18 warning">warning</i>
									Partial Connectivity
								</div>
								<div
									className={"tenant-info-box-stats-item-number-col"}
								>
									{
										(counts.siteHealthDetail ? counts.siteHealthDetail.warning : 0)
										+ (
											counts.siteHealthDetail
											&& counts.siteHealthDetail.warning === 1
											? " site"
											: " sites"
										)
									}
								</div>
							</div>
							<div className="tenant-info-box-stats-item-col last">
								<div className="tenant-info-box-stats-item-text-col">
									<i className="material-icons md-18 error">cancel</i>
									No Connectivity
								</div>
								<div
									className={"tenant-info-box-stats-item-number-col"}
								>
									{
										(counts.siteHealthDetail ? counts.siteHealthDetail.error : 0)
										+ (
											counts.siteHealthDetail
											&& counts.siteHealthDetail.error === 1
											? " site"
											: " sites"
										)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="tenant-info-box-row">
					<div className="tenant-info-box-item">
						<div className="tenant-info-box-title">
							{
								"WAN Edge Health (Total: "
								+ (tenantSelected ? tenantSelected.vEdgesDetail.count : 0)
								+ ")"
							}
						</div>
						<div className="tenant-info-box-stats-container">
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vEdgesDetail
											&& counts.vEdgesDetail.normal
											? " normal"
											: " zero"
										)
									}
								>
									{counts.vEdgesDetail ? counts.vEdgesDetail.normal : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Normal
								</div>
							</div>
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vEdgesDetail
											&& counts.vEdgesDetail.warning
											? " warning"
											: " zero"
										)
									}
								>
									{counts.vEdgesDetail ? counts.vEdgesDetail.warning : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Warning
								</div>
							</div>
							<div className="tenant-info-box-stats-item last">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vEdgesDetail
											&& counts.vEdgesDetail.error
											? " error"
											: " zero"
										)
									}
								>
									{counts.vEdgesDetail ? counts.vEdgesDetail.error : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Error
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="tenant-info-box-row last">
					<div className="tenant-info-box-item last">
						<div className="tenant-info-box-title">
							{
								"vSmart Status (Total: "
								+ (tenantSelected ? tenantSelected.vSmartsDetail.count : 0)
								+ ")"
							}
						</div>
						<div className="tenant-info-box-stats-container">
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vSmartsDetail
											&& counts.vSmartsDetail.normal
											? " normal"
											: " zero"
										)
									}
								>
									{counts.vSmartsDetail ? counts.vSmartsDetail.normal : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Normal
								</div>
							</div>
							<div className="tenant-info-box-stats-item">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vSmartsDetail
											&& counts.vSmartsDetail.warning
											? " warning"
											: " zero"
										)
									}
								>
									{counts.vSmartsDetail ? counts.vSmartsDetail.warning : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Warning
								</div>
							</div>
							<div className="tenant-info-box-stats-item last">
								<div
									className={
										"tenant-info-box-stats-item-number"
										+ (
											counts.vSmartsDetail
											&& counts.vSmartsDetail.error
											? " error"
											: " zero"
										)
									}
								>
									{counts.vSmartsDetail ? counts.vSmartsDetail.error : 0}
								</div>
								<div className="tenant-info-box-stats-item-text">
									Error
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
