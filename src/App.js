import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import ActiveCategory from './components/ActiveCategory';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

import './styles/base.scss';
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * main component that holds the 3 main components of the app: Header, main content (differs on route), and footer
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div id="main-content" className="fade-in">
          <Route path="/" exact>
            <Categories />
            <ActiveCategory />
            <Products />
          </Route>
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
