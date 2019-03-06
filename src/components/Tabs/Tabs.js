import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

import styles from './Tabs.scss';

/**
 * Navigation Component
 *
 * Renders the menu based on the items prop that contains everything such as title,
 * icon, url etc.
 * @type {Object}
 */
export default class Tabs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onNavigate: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    onChange: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    onNavigate: cb => cb(),
  };

  /**
   * activeIndex tracks the index of the currently selected menu item
   * left is the x-offset of the selected menu item (where the underline starts)
   * width the is width of the selected menu item
   * @type {Object}
   */
  state = {
    activeIndex: 0,
    left: 0,
    width: 0,
  };

  /**
   * To keep track of all the Menu Item DOMElements
   * (so that we can get their locations/dimensions
   * through getBoundingClientRect())
   * @type {Array}
   */
  _menuItemDOMs = [];

  /**
   * On mount we check if there's already a menu item that's selected, if yes,
   * then calculate it's left position as well as the width. So that we can
   * set the underline at the right position with the right dimensions
   * @return {[type]} [description]
   */
  componentDidMount() {
    const index = this._getIndexFromValue(this.props.items, this.props.value);
    setTimeout(() => this._calcWidthAndPosition(index), 50);
  }

  /**
   * Same as componentDidMount but we want to do the same even on change of
   * props
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const index = this._getIndexFromValue(nextProps.items, nextProps.value);
      setTimeout(() => this._calcWidthAndPosition(index), 50);
    }
  }

  /**
   * Renders the horizontal menu
   * @return {[type]} [description]
   */
  render() {
    const { className } = this.props;
    return (
      <div className={`${styles.Tabs} ${className}`}>
        <div className={`${styles.TabsItems} ${className}-items`}>{this.props.items.map(this._renderMenuItem)}</div>
        <div
          style={{
            transform: `translateX(${this.state.left}px) scale(${this.state.width}, 1)`,
          }}
          className={`${styles.TabsIndicator} ${className}-indicator`}
        />
      </div>
    );
  }

  /**
   * Custom renderer to render the individual menu items
   * Using the ref attribute, we get the DOMElement wrapper associated with this
   * menu item. We push the DOMElement into the this._menuItems array at it's
   * index
   * @param  {[type]} item [description]
   * @param  {[type]} i    [description]
   * @return {[type]}      [description]
   */
  _renderMenuItem = (item, i) => {
    const { className } = this.props;
    const isActive = i === this.state.activeIndex;
    const activeClassName = isActive ? styles.active : '';
    const activeStringClassName = isActive ? 'active' : '';
    const activeIconClassName = isActive ? 'active' : '';
    const disabledClassName = item.disabled ? styles.disabled : '';
    const bigClassName = this.props.big ? styles.big : '';
    return (
      <div
        onClick={() => this._handleClick(i)}
        ref={(menuItemDOM) => {
          this._menuItemDOMs[i] = menuItemDOM;
        }}
        key={i}
        style={{ width: item.width || 'auto' }}
        className={`${
          styles.TabsItem
        } ${className}-item ${activeClassName} ${activeStringClassName} ${disabledClassName} ${bigClassName}`}
      >
        {item.component ? (
          React.cloneElement(item.component, { active: isActive })
        ) : (
          <React.Fragment>
            <Icon
              src={item.iconType ? undefined : item.icon}
              iconType={isActive ? item.activeIconType : item.iconType}
              className={`${styles.TabsItemIcon} ${bigClassName} ${className}-item-icon ${activeIconClassName}`}
            />
            <span className={`${styles.TabsItemText} ${activeClassName} ${bigClassName} ${className}-item-text`}>
              {item.title}
            </span>
          </React.Fragment>
        )}
      </div>
    );
  };

  /**
   * Returns the index of the item in the menu that's already selected
   * (based on the URL and the path property specified in the menu item obj)
   * @param  {Array}  [items=[]] [description]
   * @return {[type]}            [description]
   */
  _getIndexFromValue = (items = [], value) => {
    let index = -1;
    items.map((item, i) => {
      if (value.includes(item.path)) {
        index = i;
      } else if ((item.paths || []).filter(path => value.includes(path)).length > 0) {
        index = i;
      }
    });

    return index;
  };

  /**
   * OnClick, we want to switch to the new menu item. For that we change the url
   * and we also calculate the new width and offset with our helper function
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  _handleClick = (index) => {
    this.props.onNavigate(() => {
      this._changeURL(this.props.items[index].path || this.props.items[index].paths[0]);
    });
  };

  /**
   * Helper wrapper to call our prop function
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  _changeURL = (path) => {
    this.props.onMenuItemClick && this.props.onMenuItemClick(path);
    this.props.onChange && this.props.onChange(path);
  };

  /**
   * This calculates the width and the offset of a particular menu item (whose
   * index is the param). Uses getBoundingClientRect and the DOMElements to
   * determine the right values
   * @param  {[type]} newIndex [description]
   * @return {[type]}          [description]
   */
  _calcWidthAndPosition = (newIndex) => {
    let left = 0;
    let width = 0;
    this._menuItemDOMs.map((DOMElement, i) => {
      if (i < newIndex && i >= 0) {
        left += DOMElement.getBoundingClientRect().width;
      } else if (i === newIndex) {
        width = DOMElement.getBoundingClientRect().width - 1;
      }
    });

    this.setState({ left, width, activeIndex: newIndex });
  };
}
