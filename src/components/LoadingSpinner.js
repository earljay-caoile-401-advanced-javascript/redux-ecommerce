import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/spinner.scss';

/**
 * component that displays while an API fetch function is taking place
 * uses Font Awesome to display the magic
 * @return  {object}  JSX content to be rendered
 */
function LoadingSpinner(props) {
  return props.loading ? (
    <div className="loading">
      <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '100px' }} />
    </div>
  ) : null;
}

export default LoadingSpinner;