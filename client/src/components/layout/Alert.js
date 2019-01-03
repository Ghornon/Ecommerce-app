import React from 'react';

export default props => {
	return props.visible ? (
		<div className={`alert alert-${props.type}`} onClick={props.hide}>
			{props.message}
		</div>
	) : (
		<div />
	);
};
