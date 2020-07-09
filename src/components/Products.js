import React from 'react';
import { connect } from 'react-redux';

function Products(props) {
  const prodsToRender = [];
  const propProds = props.products;

  if (propProds) {
    propProds.forEach((product, i) => {
      if (product.category === props.currentCategory) {
        prodsToRender.push(<h3 key={i}>{product.name}</h3>);
      }
    });
  }

  return (
    <>
      <h2>Products</h2>
      <>{prodsToRender}</>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currentCategory: state.currentCategory,
  };
};

export default connect(mapStateToProps)(Products);
