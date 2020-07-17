import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import ActiveCategory from './components/ActiveCategory';
import Products from './components/Products';
import './styles/base.scss';

/**
 * main component that holds the 3 main components of the app: Header, ToDo, and Footer
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
      <Header />
      <div id="main-content" className="fade-in">
        <Categories />
        <ActiveCategory />
        <Products />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
