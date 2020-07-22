'use strict';

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('app component', () => {
  it('displays the proper html and text on render', () => {
    const component = mount(<App />);
    expect(component).toBeDefined();
    const categories = component.find('#categories');
    const products = component.find('#products');
    const catText = categories.text();
    const prodText = products.text();
    expect(catText.includes('Browse our Categories')).toBeTruthy();
    expect(prodText.includes('Products')).toBeTruthy();
  });
});
