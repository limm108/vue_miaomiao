// 地址
const state={
  nm: window.localStorage.setItem('nowNm') || '北京',
  id: window.localStorage.setItem('nowId') || 1
};
const actions={

};
const mutations={
  CITY_INFO(state,payload){
    state.nm=payload.nm;
    state.id=payload.id;
  }

};
export default{
  namespaced:true,
  state,
  acrions,
  mutations
}
