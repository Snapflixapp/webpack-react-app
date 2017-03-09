// import jwtDecode from 'jwt-decode'
//
// export default (state, action) => {
//   if (typeof state !== 'undefined' && window.localStorage.getItem('snapflixtoken')) {
//     state = {
//       comments: [],
//       user: jwtDecode(window.localStorage.getItem('snapflixtoken')).username
//     }
//   } else {
//     state = {
//       comments: [],
//       user: 'anonymous'
//     }
//   }
//   switch (action.type) {
//     case 'ADD_COMMENT':
//       return Object.assign({}, state, {
//         comments: [...action.payload.oldComments, action.payload.comment]
//       })
//     default:
//       return state
//   }
// }
