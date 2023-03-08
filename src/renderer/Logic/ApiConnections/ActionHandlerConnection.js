export function openVSCode() {
  const response = window.apiConnection.send('openVsCode');
  return response;
}
export function relaunchSignalRGB() {
  const response = window.apiConnection.send('relaunchSignalRGB');
  return response;
}

export function copyEffect(filePath) {
  const response = window.apiConnection.send('copyEffect', filePath);
  return response;
}
export function openDynamicFolder() {
  const response = window.apiConnection.send('openDynamicFolder');
  return response;
}
