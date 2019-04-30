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
