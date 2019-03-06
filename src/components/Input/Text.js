import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import { ToastMessage } from 'decorators';
import { CONSTRAINTS } from 'constants';
import Icon from 'components/Icon';
import EmojiIcon from 'icons/smiley.svg';
import SpeakerIcon from 'icons/speaker.svg';

import { scrollIntoViewIfNeeded } from 'utils/generic';
import styles from './Text.scss';

@ToastMessage()
export default class Text extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    multiline: PropTypes.bool,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    withMargin: PropTypes.bool,
    hasCounter: PropTypes.bool,
    hasVoice: PropTypes.bool,
    disableMaxLineValidation: PropTypes.bool,
    counterLimit: PropTypes.number,
    labelClassName: PropTypes.string,
    hint: PropTypes.string,
    onEmojiClick: PropTypes.func,
    activateToastMessage: PropTypes.func,
    maxCharacters: PropTypes.number,
    inputType: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onKeyDown: PropTypes.func,
    error: PropTypes.string,
    errorMessage: PropTypes.string,
    errorMsgClassName: PropTypes.string,
  };

  static defaultProps = {
    inputType: 'text',
  };

  state = {
    active: false,
    synthesisText: undefined,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this._timeout = setTimeout(this._onFocus, 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoFocus && !this.props.autoFocus) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => this._onFocus(), 500);
    }
  }

  render() {
    const {
      placeholder,
      className,
      value,
      label,
      multiline,
      withMargin,
      hasCounter,
      hasVoice,
      labelClassName,
      errorMsgClassName,
      counterLimit,
      maxCharacters,
      hint,
      disabled,
      error,
      errorMessage,
    } = this.props;
    const Input = this._getTag(multiline);
    const activeClassName = this.state.active ? styles.textActive : '';
    const errorClassName = error ? styles.textError : '';
    const marginClassName = withMargin ? styles.textWithMargin : '';
    const disabledClassName = disabled ? styles.disabled : '';
    const speakingClassName = this.state.synthesisText ? styles.speaking : '';
    return (
      <div className={`${styles.text} ${className} ${activeClassName} ${errorClassName} ${marginClassName}`}>
        <div className={`${styles.textLabelWrapper}`}>
          <span className={`${styles.textLabel} ${labelClassName}`}>{label}</span>
        </div>
        {hint ? <span className={`${styles.textHint}`}>{hint}</span> : null}
        <div className={styles.inputWrapper}>
          <div className={`${styles.textInputWrapper} ${disabledClassName}`}>
            <Input
              ref={!multiline ? this._onRef : null}
              inputRef={multiline ? this._onInnerRef : null}
              value={value}
              onChange={this._handleChange}
              type={this.props.inputType}
              placeholder={placeholder}
              className={`${styles.textInput} ${multiline ? styles.multiline : ''} ${disabledClassName}`}
              tabIndex={disabled ? -1 : 0}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
              min={this.props.min}
              max={this.props.max}
              onKeyDown={this._onKeyDown}
            />
          </div>
          {this.props.onEmojiClick ? (
            <Icon
              innerRef={(DOMElement) => {
                this._emojiIcon = DOMElement;
              }}
              onClick={this._handleEmojiClick}
              src={{ default: EmojiIcon }}
              className={styles.emojiIcon}
            />
          ) : null}
        </div>
        {hasCounter ? (
          <div className={styles.textInputSubtext}>
            <span className={styles.textInputSubtextCount}>
              {(value || '').length}/{counterLimit || maxCharacters || '150'} characters
            </span>
          </div>
        ) : null}
        {error &&
          errorMessage && (
            <div className={`${styles.textInputSubtext} ${errorMsgClassName}`}>{this._renderError(errorMessage)} </div>
          )}
      </div>
    );
  }

  _handleChange = (e) => {
    this.props.onChange(e.target.value, e);
  };

  _onKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  _renderError = (errorMessage) => {
    return <span className={styles.textInputSubtextError}>{errorMessage}</span>;
  };

  _onRef = (DOMElement) => {
    if (DOMElement) this._inputDOM = DOMElement;
  };

  _onInnerRef = (DOMElement) => {
    if (DOMElement) this._inputDOM = DOMElement;
  };

  _onFocus = (e) => {
    this.setState({ active: true });
    this._inputDOM.focus();
    requestAnimationFrame(() => scrollIntoViewIfNeeded(this._inputDOM))
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  _onBlur = (e) => {
    this.setState({ active: false });
    this._inputDOM.blur();
    clearTimeout(this._timeout);
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _getTag = (isMutiline) => {
    if (isMutiline) {
      return Textarea;
    }

    return 'input';
  };

  _handleEmojiClick = () => {
    this._start = this._inputDOM.selectionStart;
    this._end = this._inputDOM.selectionEnd;
    this.props.onEmojiClick(this._emojiIcon.getBoundingClientRect(), (emoji) => {
      this._insertEmoji(emoji);
    });
  };

  _insertEmoji = (emoji) => {
    if (!this.props.value) {
      this.props.onChange(emoji);
      this._inputDOM.selectionStart = emoji.length;
      this._inputDOM.selectionEnd = emoji.length;
      this._inputDOM.focus();
      return;
    }

    let start = this._start;
    let end = this._end;

    if (start === 0 && end === 0) {
      start = this.props.value.length;
      end = this.props.value.length;
    }

    const text = this.props.value || '';
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const newValue = before + emoji + after;
    this.props.onChange(newValue);
    this._inputDOM.selectionStart = start + emoji.length;
    this._inputDOM.selectionEnd = start + emoji.length;
    this._inputDOM.focus();
  };

  _toggleAudio = () => {
    this.setState({ synthesisText: this.state.synthesisText ? undefined : this.props.value });
  };

  _resetAudio = () => {
    this.setState({ synthesisText: undefined });
  };
}
