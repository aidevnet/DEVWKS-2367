import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.cardStatus !== nextProps.cardStatus) return true;

		return false;
	}

	render() {
		const {
			warning,
			error
		} = this.props.cardStatus;

		// If none of these stats are set then default to green charts.
		const normal = (
			!this.props.cardStatus.normal
			&& !warning
			&& !error
		) ? 1 : this.props.cardStatus.normal;

		const options = {
			chart: {
				height: 149,
				backgroundColor: null,
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: "pie"
			},
			title: null,
			colors: [
				"#90cc84", "#ffd562", "#ff6e56"
			],
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: "pointer",
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: "Tenant Count",
				colorByPoint: true,
				data: [{
					name: "Normal",
					y: normal > 0 ? normal : null
				},
				{
					name: "Warning",
					y: warning > 0 ? warning : null
				},
				{
					name: "Error",
					y: error > 0 ? error : null
				}]
			}],
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
			}
		}

		return (
			<div className="chart-wrapper">
				<HighchartsReact
					highcharts={Highcharts} 
					options={options}
				/>
			</div>
		);
	}
}
