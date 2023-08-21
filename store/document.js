// import Cookies from 'js-cookie'

// state
export const state = () => ({
    files: [],
  });
  
  // getters
  export const getters = {
    files: (state) => state.files
  };
  
  // mutations
  export const mutations = {
    SET_FILE(state, file) {
      state.file = file;
    },
  
    SET_FILE_NAME(state, file_name) {
      state.file_name = file_name;
    },
    
    SET_FILES(state, files) {
      state.files = files;
    },
  
    ADD_FILE(state, data) {
      state.files.splice(0, 0, data);
    },
  
    REMOVE_FILE(state, data) {
      let index = state.files.findIndex((d) => {
        return d.type === data.type;
      });
      state.files.splice(index, 1);
    },
  };
  