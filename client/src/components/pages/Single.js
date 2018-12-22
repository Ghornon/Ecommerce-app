import React, { Component } from 'react';
import Categories from '../layout/categories';
import authGuard from '../helpers/authGuard';

export default class Single extends Component {
	state = {
		product_id: 0,
		name: 'Name',
		price: 0,
		description: '',
		svg: 'svg'
	};
	componentDidMount() {
		const id = this.props.match.params.id;
		const self = this;
		fetch(`/api/products/${id}`)
			.then(data => data.json())
			.then(data => {
				const { product_id, name, price, description, svg } = data.products[0];
				console.log(data.products);
				self.setState({ product_id, name, price, description, svg });
			});
	}

	handleOnClick(id, event) {
		event.preventDefault();
		if (authGuard.isAuthenticated) {
			this.props.addProductToCart(id);
		} else {
			this.props.alert('You need to be logged if u want to add product to cart', 'warning');
		}
	}

	render() {
		const { product_id, name, price, description, svg } = this.state;
		const descriptionLi = description.split('\n').map((element, index) => {
			return (
				<li className="item" key={index}>
					{element}
				</li>
			);
		});
		return (
			<main className="products">
				<Categories />

				<div className="single">
					<div className="slider">
						<ul className="slider-thumbnail">
							<li className="thumbnail-item active">
								<img src={svg} alt={name} className="thumbnail-img" />
							</li>
							<li className="thumbnail-item">
								<img src={svg} alt={name} className="thumbnail-img" />
							</li>
							<li className="thumbnail-item">
								<img src={svg} alt={name} className="thumbnail-img" />
							</li>
							<li className="thumbnail-item">
								<img src={svg} alt={name} className="thumbnail-img" />
							</li>
						</ul>

						<div className="slider-image">
							<img src={svg} alt={name} className="thumbnail-img" />
						</div>
					</div>

					<div className="container">
						<h2 className="product-name">{name}</h2>
						<ul className="product-description">{descriptionLi}</ul>
						<div className="product-price">
							Price:
							<span className="price">$ {price}</span>
						</div>
						<span
							onClick={this.handleOnClick.bind(this, product_id)}
							className="btn btn-blue"
						>
							<i className="fas fa-plus" /> Add to cart!
						</span>
					</div>
				</div>
			</main>
		);
	}
}
