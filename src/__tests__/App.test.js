'use strict';

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import sampleData from '../data/db.json';

describe('app component', () => {
  it('displays the proper html and text on render', () => {
    const component = mount(<App />);
    expect(component).toBeDefined();

    const categories = component.find('#categories');
    const products = component.find('#products');
    expect(categories).toHaveLength(1);
    expect(products).toHaveLength(1);

    const catText = categories.text();
    const prodText = products.text();
    expect(catText.includes('Browse our Categories')).toBeTruthy();
    expect(catText.includes(sampleData.categories[0].displayName)).toBeTruthy();

    const activeCat = component.find('#active-category');
    const activeH3 = activeCat.find('h3');
    const activeH6 = activeCat.find('h6');
    expect(activeH3.text()).toBe(
      sampleData.categories[0].displayName.toUpperCase()
    );
    expect(activeH6.text()).toBe(sampleData.categories[0].description);

    let expectedProds = sampleData.products.filter(
      (product) => product.category === sampleData.categories[0].name
    );

    expectedProds.forEach((product) => {
      expect(
        prodText.includes(product.displayName || product.name)
      ).toBeTruthy();
    });
  });
});
