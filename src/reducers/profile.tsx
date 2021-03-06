export default (
  state: object | null = null,
  action: {
    type: string;
    payload: object | null;
  }
) =>
  action.type === 'SET_PROFILE' || action.type === 'LOGOUT'
    ? action.payload
    : state;
