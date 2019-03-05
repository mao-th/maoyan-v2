export default function createSaveLocalStoragePlugin() {
  return store => {
    try {
      // 防止用户本地禁用了localStorage 本地存储功能
      if (localStorage.Maoyan_historyCity) {
        store.commit(
          "SET_ACCESSCITYLIST",
          JSON.parse(localStorage.Maoyan_historyCity)
        );
      }
      if (localStorage.search) {
        store.commit("SET_SEARCH", JSON.parse(localStorage.search));
      }

      // 每次提交mutition时即会触发该函数
      store.subscribe((mutation, state) => {
        if (
          mutation.type === "SET_SEARCH_MOVIE" ||
          mutation.type === "SET_SEARCH_CINEMA" ||
          mutation.type === "DELETE_SEARCH_MOVIE" ||
          mutation.type === "DELETE_SEARCH_CINEMA"
        ) {
          _saveLocalStorage(state);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}

function _saveLocalStorage(state) {
  try {
    localStorage.search = JSON.stringify(state.search);
  } catch (err) {
    console.log(err);
  }
}
