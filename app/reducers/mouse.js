export default function mouse(state, action) {
  if (typeof state === 'undefined') {
    return { x: null, y: null };
  }

  switch (action.type) {
    case 'UPDATE': {
      return { x: action.x, y: action.y };
    }

    default: {
      return state;
    }
  }
}
