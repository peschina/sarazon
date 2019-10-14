import React from 'react';

const productPage = props => {
	return <div>{props.match.params.id}</div>;
}

export default productPage;

