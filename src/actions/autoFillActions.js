import {store} from '../firebase/firebase';

export const GET_SECTIONS_INIT = 'GET_SECTIONS_INIT';
export const GET_SECTIONS_SUCCESS = 'GET_SECTIONS_SUCCESS';
export const GET_SECTIONS_FAIL = 'GET_SECTIONS_FAIL';

export const getSections = () => dispatch => {
  dispatch({type: GET_SECTIONS_INIT});
  store
    .collection('autoFill')
    .doc('web')
    .collection('sections')
    .orderBy('order', 'asc')
    .get()
    .then(sections => {
      console.log(sections);
      let sectionsObject = {};
      sections.forEach(section => {
        sectionsObject[section.id] = section.data();
      });
      console.log(sectionsObject);
      dispatch({
        type: GET_SECTIONS_SUCCESS,
        payload: sectionsObject,
      });
    })
    .catch(err => {
      dispatch({type: GET_SECTIONS_FAIL, payload: err});
    });
};

// export const makeSections = () => dispatch => {
//   const sections = [
//     'User Interface I',
//     'User Interface II',
//     'User Interface III',
//     'Git for Web Development',
//     'Sprint Challenge - User Interface and Responsive Web Sprint Challenge',
//     'Responsive Design I',
//     'Responsive Design II',
//     'Preprocessing I',
//     'Preprocessing II',
//     'Sprint Challenge - Advanced CSS Sprint Challenge',
//     'JavaScript I',
//     'JavaScript II',
//     'JavaScript III',
//     'JavaScript IV',
//     'Sprint Challenge - JavaScript Foundations Sprint Challenge',
//     'DOM I',
//     'DOM II',
//     'Components I',
//     'Components II',
//     'Sprint Challenge - Applied JavaScript Challenge',
//     'Functional Components I',
//     'Functional Components II',
//     'Class Components I',
//     'Class Components II',
//     'Sprint Challenge - React Wars',
//     'React Tooling',
//     'The React Lifecycle',
//     'React Composition Patterns',
//     'CSS in JS',
//     'Sprint Challenge - Lambda Times, React',
//     'React Router I',
//     'React Router II',
//     'HTTP / AJAX I',
//     'HTTP / AJAX II',
//     'Sprint Challenge - React (SPA) Smurfs',
//     'Redux Fundamentals I',
//     'Redux Fundamentals II',
//     'Async Redux - Redux Thunk',
//     'Redux Middleware / Authentication',
//     'Sprint Challenge - Redux Smurfs',
//     'Introduction to Node.js and Express',
//     'Server-side Routing',
//     'Express Middleware',
//     'Deployment and Best Practices',
//     'Sprint Challenge - Web API Unit Challenge',
//     'Introduction to Relational Databases and SQL',
//     'Inserting and Modifying Data',
//     'Querying Data, Migrations and Seeding',
//     'Introduction to Data Modeling',
//     'Sprint Challenge - Web DB Sprint Challenge',
//     'Introduction to Authentication',
//     'Using Sessions and Cookies',
//     'Using JSON Web Tokens (JWT)',
//     'Client Side Authentication',
//     'Sprint Challenge - Authentication',
//     'Testing I',
//     'Testing II',
//     'Testing III',
//     'Testing IV',
//     'Sprint Challenge - Testing Sprint Challenge',
//   ];
//   sections.forEach((section, index) => {
//     console.log({
//       order: index + 1,
//       name: section,
//       isProject: (index + 1) % 5 === 0 ? false : true,
//     });
//     store.collection('autoFill').doc('web').collection('sections').add({
//       order: index + 1,
//       name: section,
//       isProject: (index + 1) % 5 === 0 ? false : true,
//     })
//   });
// };
