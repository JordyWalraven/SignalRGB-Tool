export function getCursorPosition() {
  const response = window.apiConnection.send('getCursor');
  console.log(response);
  return response;
}
export function getKeyDown() {
  const response = window.apiConnection.send('getKeyDown');
  return response;
}
