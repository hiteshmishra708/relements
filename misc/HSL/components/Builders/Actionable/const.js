export const ACTIONABLE_TYPES = {
  OPEN_SCREEN: 'Open Screen',
};

export const ACTIONABLE_OPTIONS = Object.keys(ACTIONABLE_TYPES).map(key => ({
  label: ACTIONABLE_TYPES[key],
  value: key,
}));

export const URI_TYPES = {
  WEBVIEW: 'webview',
};

export const URI_OPTIONS = Object.keys(URI_TYPES).map(key => ({
  label: URI_TYPES[key],
  value: key,
}));
