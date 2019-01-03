import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	const navItems = [
		'Unde, amet!',
		'Quae, dolore!',
		'Dolorem, accusamus!',
		'Ullam, consequatur!',
		'Dolorum, quidem.',
		'Harum, consequuntur.',
		'Nostrum, veniam.',
		'Tenetur, excepturi!',
		'Unde, eos.',
		'Necessitatibus, quod.'
	].map((element, index) => {
		return (
			<li className="nav-item" key={index}>
				<Link to={`/${index}`} className="nav-link">
					{element}
				</Link>
			</li>
		);
	});

	return (
		<ul className="nav">
			<li className="nav-item">
				<h1 className="nav-header">Lorem ipsum</h1>
			</li>
			{navItems}
		</ul>
	);
};
