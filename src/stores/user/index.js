const state={
  name: localStorage.getItem('name') | '',
  isAdmin: window.localStorage.getItem('isAdmin') | false,
  userHead:''
};

const actions={

};
const multactions={
  USER_NAME(state,playload){
    state.name=playload.name;
    state.isAdmin=payload.isAdmin;
    state.userHead=payload.userHead;
  }
};

export default{
  namespace:true,
  state,
  actions,
  mutations
}
