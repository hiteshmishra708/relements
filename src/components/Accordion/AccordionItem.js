import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import Icon from 'components/Icon';
import AngleDownIcon from 'icons/angle-down.svg';
import ReorderIconSvg from 'icons/hamburger.svg';
import EditIcon from 'icons/edit.svg';
import TrashIcon from 'icons/trash.svg';
import StarIcon from 'icons/star.svg';
import styles from './AccordionItem.scss';

class AccordionItem extends React.Component {
  state = {
    headerHeight: 0,
    bodyHeight: 0,
  };

  componentDidMount() {
    this._resize();
  }

  componentWillReceiveProps() {
    this._resize();
  }

  render() {
    const {
      active,
      onToggle,
      itemIndex,
      noPadding,
      noBorder,
      transparent,
    } = this.props;
    const activeClassName = active ? styles.active : '';
    let totalHeight = this.state.headerHeight;
    if (active) {
      totalHeight += this.state.bodyHeight;
    }

    const noPaddingClassName = noPadding ? styles.noPadding : '';
    const noBorderClassName = noBorder ? styles.noBorder : '';
    const transparentClassName = transparent ? styles.transparent : '';
    return (
      <div
        className={`${styles.accordionItem} ${activeClassName} ${noBorderClassName} ${transparentClassName}`}
        style={{ height: totalHeight }}
      >
        <div
          className={`${styles.accordionItemHeader} ${noPaddingClassName}`}
          onClick={e => onToggle(itemIndex, e)}
          ref={(headerDOM) => {
            if (headerDOM) {
              this._header = headerDOM;
            }
          }}
        >
          {this._renderHeader()}
          <Icon className={`${styles.icon} ${styles.arrowIcon} ${activeClassName}`} src={{ default: AngleDownIcon }} />
        </div>
        <div
          className={`${styles.accordionItemBody} ${noPaddingClassName}`}
          ref={(bodyDOM) => {
            if (bodyDOM) {
              this._body = bodyDOM;
            }
          }}
        >
          {this._renderChildren()}
        </div>
      </div>
    );
  }

  _renderHeader = () => {
    const {
      headerComponent,
      renderHeaderFunc,
      reorderDisabled,
      isStarred,
      title,
      onStar,
      onDelete,
      onEdit,
      itemIndex,
    } = this.props;

    const ReorderIcon = SortableHandle(Icon);
    const starredClassName = isStarred ? styles.iconStarred : '';

    const reorderIcon = (
      <ReorderIcon className={`${styles.icon} ${styles.reorderIcon}`} src={{ default: ReorderIconSvg }} />
    );
    if (headerComponent) {
      return headerComponent;
    }

    if (renderHeaderFunc) {
      return renderHeaderFunc(reorderIcon);
    }

    return [
      <div className={styles.leftColumn}>
        {reorderDisabled ? null : reorderIcon}
        <span className={styles.accordionItemHeaderText}>{title}</span>
      </div>,
      <div className={styles.rightColumn}>
        {onStar ? (
          <Icon
            onClick={e => onStar(itemIndex, e)}
            className={`${styles.icon} ${starredClassName}`}
            src={{ default: StarIcon }}
          />
          ) : null}
        {onDelete ? (
          <Icon onClick={e => onDelete(itemIndex, e)} className={styles.icon} src={{ default: TrashIcon }} />
          ) : null}
        {onEdit ? (
          <Icon onClick={e => onEdit(itemIndex, e)} className={styles.icon} src={{ default: EditIcon }} />
          ) : null}
      </div>,
    ];
  }

  _renderChildren = () => {
    return React.Children.map(this.props.children, (child, index) => {
      if (!child) return null;
      return (
        <React.Fragment key={index}>{React.cloneElement(child, { resizeContainer: this._resize })}</React.Fragment>
      );
    });
  };

  _resize = () => {
    if (!this._header || !this._body) return;

    setTimeout(() => {
      const headerRect = this._header.getBoundingClientRect();
      const bodyRect = this._body.getBoundingClientRect();
      this.setState({
        headerHeight: headerRect.height,
        bodyHeight: bodyRect.height,
      });
    }, 0);
  };
}

AccordionItem.propTypes = {
  itemIndex: PropTypes.number.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isStarred: PropTypes.bool,
  reorderDisabled: PropTypes.bool,
  noBorder: PropTypes.bool,
  transparent: PropTypes.bool,
  onStar: PropTypes.func,
  renderHeaderFunc: PropTypes.func,
  noPadding: PropTypes.bool,
  headerComponent: PropTypes.element,
};

export default SortableElement(AccordionItem);
