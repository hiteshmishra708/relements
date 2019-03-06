import { IMAGE_EXTENSIONS } from 'constants';

export function isValidURL(str) {
  /*
    validUrlList = [
      "https://www.google.com",
      "http://www.google.com",
      "https://www.google.com/awd",
      "https://www.google.com/awd?w=654&h=890",
      "http://haptikappimg.haptikapi.com/content/d42a9ad09e9778b177d409f5716ac621e74282a5beec6c172bdd192359fdcc47.jpeg?w=1081&h=1080"
    ]

    invalidUrlList = [
      "[test_image]",
      "{this}",
      "only_text"
    ]
  */
  return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
    str
  );
}

export function isVideo(url) {
  if (url !== undefined || url !== '') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11;
  }
}

export function parseTypeFromURL(url) {
  const regExp = /(?:\.([^.]+))?$/;
  const extension = regExp.exec(url);
  if (IMAGE_EXTENSIONS.includes(extension[1])) return 'IMAGE';
  return 'FILE';
}

export function scrollIntoViewIfNeeded(element, centerIfNeeded = true) {
  const getParent = (el) => {
    const parent = el.parentNode;

    if (parent === document) {
      return document;
    }
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      return parent;
    }
    return getParent(parent);
  };

  const parent = getParent(element);
  const parentComputedStyle = window.getComputedStyle(parent, null);
  const parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'), 10);
  const parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'), 10);
  const overTop = element.offsetTop - parent.offsetTop < parent.scrollTop;
  const overBottom = element.offsetTop - parent.offsetTop + element.clientHeight - parentBorderTopWidth
    > parent.scrollTop + parent.clientHeight;
  const overLeft = element.offsetLeft - parent.offsetLeft < parent.scrollLeft;
  const overRight = element.offsetLeft - parent.offsetLeft + element.clientWidth - parentBorderLeftWidth
    > parent.scrollLeft + parent.clientWidth;
  const alignWithTop = overTop && !overBottom;

  if ((overTop || overBottom) && centerIfNeeded) {
    parent.scrollTop = element.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + element.clientHeight / 2;
  }

  if ((overLeft || overRight) && centerIfNeeded) {
    parent.scrollLeft = element.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + element.clientWidth / 2;
  }

  if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
    element.scrollIntoView(alignWithTop);
  }
}
