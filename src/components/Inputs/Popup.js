import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/UI/Icon';
import TickIcon from 'icons/tick.svg';
import PlusIcon from 'icons/plus.svg';

import styles from './Popup.scss';

class Popup extends React.Component {
  state = {
    popupActive: false,
  };

  render() {
    const { className } = this.props;
    return (
      <div>
        {this.props.value && Object.keys(this.props.value).length > 0 ? (
          <div onClick={this._activatePopup} className={`${styles.popupWrapper} ${className}`}>
            <div className={styles.popup}>Information Added</div>
            <Icon src={{ default: TickIcon }} className={`${styles.popupIcon} ${styles.popupIconTicked}`} />
          </div>
        ) : (
          <div onClick={this._activatePopup} className={`${styles.popupWrapper} ${className}`}>
            <div className={`${styles.popup} ${styles.popupPlaceholder}`}>Add Information</div>
            <Icon src={{ default: PlusIcon }} className={styles.popupIcon} />
          </div>
        )}
      </div>
    );
  }

  _handleChange = (data, e) => {
    this.props.onChange(data, e);
    this._deactivatePopup();
  };

  _activatePopup = () => {
    this.setState({ popupActive: true });
  };

  _deactivatePopup = () => {
    this.setState({ popupActive: false });
  };
}

Popup.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default Popup;
