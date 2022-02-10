 const loadState = () => {
    try {
      const serializedState = localStorage.getItem('userInfo');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 

  export default loadState;


  // const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   reducer: { userInfo: userInfoFromStorage },
// };