const INITIAL_STATE = {
  usuarioEmail: '',
  usuarioLogado: 0,
  usuarioNome: '',
  usuarioRole: ''
};

function usuarioReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        usuarioLogado: 1,
        usuarioEmail: action.usuarioEmail,
        usuarioNome: action.usuarioNome,
        usuarioRole: action.usuarioRole
      };
    case 'LOG_OUT':
      return {
        ...state,
        usuarioLogado: 0,
        usuarioEmail: '',
        usuarioNome: '',
        usuarioRole: ''
      };
    default:
      return state;
  }
}

export default usuarioReducer;
