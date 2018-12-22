import React, { Component } from 'react';

export default class Alert extends Component {
	render() {
		console.log(this.props);
		return this.props.visible ? (
			<div className={`alert alert-${this.props.type}`} onClick={this.props.hide}>
				{this.props.message}
			</div>
		) : (
			<div />
		);
	}
}
