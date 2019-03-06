import React from 'react';
import LoadingComponent from 'components/Loader';
import { Activify } from './Activify';
import styles from './LoaderV2.scss';

export const Loader = (props = {}, style) => (WrappedComponent) => {
  return class extends React.Component {
    state = {
      active: false,
    };

    render() {
      return (
          <>
            <WrappedComponent
              {...this.props}
              loaderActive={this.state.active}
              activateLoader={this.activateLoader}
              deactivateLoader={this.deactivateLoader}
            />
            <this._Loading active={this.state.active} zIndex={props.zIndex} customStyles={props.customStyles} />
          </>
      );
    }

    activateLoader = () => {
      this.setState({ active: true });
    };

    deactivateLoader = (e) => {
      if (e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      }
      this.setState({ active: false });
    };

    _Loading = Activify()(({ active, zIndex = 1000000000, customStyles = {} }) => {
      const activeClassName = active ? styles.active : '';
      return (
        <div style={{ zIndex, ...customStyles }} className={`${styles.loaderWrapper} ${activeClassName}`}>
          <LoadingComponent />
        </div>
      );
    });
  };
};
