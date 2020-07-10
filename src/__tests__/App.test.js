import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import sampleData from '../data/db.json';

describe('app component', () => {
  it('displays the proper html and text on render', () => {
    const component = mount(<App />);
    expect(component).toBeDefined();

    const categories = component.find('#categories');
    expect(categories).toBeDefined();
  });
});
