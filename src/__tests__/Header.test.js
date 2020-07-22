'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { mount } from 'enzyme';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import store from '../store';

describe('header component', () => {
  it('displays the proper html and text on render', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();

    const h6Tag = component.find('h6').at(0);
    expect(h6Tag).toBeDefined();
    expect(h6Tag.text()).toBe('Dat Online Store');
  });
});
