import React from 'react';
import PropTypes from 'prop-types';
import styles from './Activify.scss';

export const Activify = () => (WrappedComponent) => {
  return class extends React.Component {
    static propTypes = {
      active: PropTypes.bool,
      noDisable: PropTypes.bool,
    };

    state = {
      disabled: true,
      active: false,
    };

    componentDidMount() {
      this.props.active ? this._enable(true) : this._disable();
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.active && nextProps.active) {
        this._enable();
      } else if (this.props.active && !nextProps.active) {
        this._disable();
      }
    }

    render() {
      if (this.state.disabled) return null;
      return (
        <div className={`${styles.activify}`}>
          <WrappedComponent {...this.props} {...this.state} active={this.state.active} />
        </div>
      );
    }

    _enable = (isDirect) => {
      // if (this.state.active) return;

      clearTimeout(this._timeout);
      this.setState({ disabled: false, active: isDirect });
      this._timeout = setTimeout(() => {
        requestAnimationFrame(() => this.setState({ active: true }));
      }, 0);
    };

    _disable = () => {
      // if (!this.state.active) return;

      clearTimeout(this._timeout);
      this.setState({ active: false });
      if (this.props.noDisable) {
        this.setState({ disabled: false });
        return;
      }
      this._timeout = setTimeout(() => {
        requestAnimationFrame(() => this.setState({ disabled: true }));
      }, 400);
    };
  };
};
