import React from 'react';
import PropTypes from 'prop-types';

const TacoForm = props => (
  <form onSubmit={props.submitLocation} className="form">
    <input
      type="text"
      name="text"
      placeholder="Where do you want tacos?"
      value={props.text}
      onChange={props.handleChangeText}
    />
    <button type="submit">Submit</button>
  </form>
);

TacoForm.propTypes = {
  submitLocation: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TacoForm.defaultProps = {
  text: '',
};

export default TacoForm;