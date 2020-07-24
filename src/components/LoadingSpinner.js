import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/spinner.scss';

/**
 * component that displays while an API fetch function is taking place. Uses Font Awesome to display
 * the magic. Relies on a loading boolean to render.
 *
 * @component
 * @example
 * return (
 *   <LoadingSpinner loading={fetchingGet}/>
 * )
 */
function LoadingSpinner(props) {
  return props.loading ? (
    <div className="loading">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        style={{ fontSize: '100px', margin: '1.5em auto' }}
      />
    </div>
  ) : null;
}

export default LoadingSpinner;
