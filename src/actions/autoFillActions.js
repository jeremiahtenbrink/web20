import { store } from "../firebase/firebase";

export const GET_SECTIONS_INIT = "GET_SECTIONS_INIT";
export const GET_SECTIONS_SUCCESS = "GET_SECTIONS_SUCCESS";
export const GET_SECTIONS_FAIL = "GET_SECTIONS_FAIL";

export const getSections = () => dispatch => {
    dispatch( { type: GET_SECTIONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sections" )
        .orderBy( "order", "asc" )
        .get()
        .then( sections => {
            
            let sectionsArray = [];
            let sprintsArray = [];
            sections.forEach( section => {
                const data = section.data();
                if( data.isProject ){
                    sectionsArray.push( { ...data, id: section.id } );
                }else{
                    
                    sprintsArray.push( {
                        ...data,
                        name: data.name.replace( "Sprint" + " Challenge -",
                            ""
                        ),
                        id: section.id
                    } );
                }
            } );
            
            dispatch( {
                type: GET_SECTIONS_SUCCESS,
                payload: { lessons: sectionsArray, sprints: sprintsArray }
            } );
        } )
        .catch( err => {
            dispatch( { type: GET_SECTIONS_FAIL, payload: err } );
        } );
};

export const UPDATE_LESSONS_INIT = "UPDATE_LESSONS_INIT";
export const UPDATE_LESSONS_SUCCESS = "UPDATE_LESSONS_SUCCESS";
export const UPDATE_LESSONS_FAIL = "UPDATE_LESSONS_FAIL";

export const updateLesson = lesson => dispatch => {

    dispatch( { type: UPDATE_LESSONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sections" ).doc( lesson.id )
        .update( lesson )
        .then( res => {
            console.log( res );
            dispatch( {
                type: UPDATE_LESSONS_SUCCESS, payload: lesson,
            } );
        } )
        .catch( err => {
            dispatch( { type: UPDATE_LESSONS_FAIL, payload: err } );
        } );
};

export const DELETE_LESSONS_INIT = "DELETE_LESSONS_INIT";
export const DELETE_LESSONS_SUCCESS = "DELETE_LESSONS_SUCCESS";
export const DELETE_LESSONS_FAIL = "DELETE_LESSONS_FAIL";

export const deleteLesson = lesson => dispatch => {

    dispatch( { type: DELETE_LESSONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sections" ).doc( lesson.id )
        .delete()
        .then( res => {
            console.log( res );
            dispatch( {
                type: DELETE_LESSONS_SUCCESS, payload: lesson,
            } );
        } )
        .catch( err => {
            dispatch( { type: DELETE_LESSONS_FAIL, payload: err } );
        } );
};

export const ADD_LESSONS_INIT = "ADD_LESSONS_INIT";
export const ADD_LESSONS_SUCCESS = "ADD_LESSONS_SUCCESS";
export const ADD_LESSONS_FAIL = "ADD_LESSONS_FAIL";

export const addLesson = lesson => dispatch => {
    debugger;
    dispatch( { type: ADD_LESSONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sections" )
        .add(lesson)
        .then( res => {
            console.log( res );
            lesson.id = res.id;
            dispatch( {
                type: ADD_LESSONS_SUCCESS, payload: lesson,
            } );
        } )
        .catch( err => {
            dispatch( { type: ADD_LESSONS_FAIL, payload: err } );
        } );
};

export const UPDATE_INSTRUCTORS_INIT = "UPDATE_INSTRUCTORS_INIT";
export const UPDATE_INSTRUCTORS_SUCCESS = "UPDATE_INSTRUCTORS_SUCCESS";
export const UPDATE_INSTRUCTORS_FAIL = "UPDATE_INSTRUCTORS_FAIL";

export const updateInstructor = instructor => dispatch => {

    dispatch( { type: UPDATE_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" ).doc( instructor.id )
        .update( instructor )
        .then( res => {

            console.log( res );
            dispatch( {
                type: UPDATE_INSTRUCTORS_SUCCESS, payload: instructor,
            } );
        } )
        .catch( err => {
            dispatch( { type: UPDATE_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const DELETE_INSTRUCTORS_INIT = "DELETE_INSTRUCTORS_INIT";
export const DELETE_INSTRUCTORS_SUCCESS = "DELETE_INSTRUCTORS_SUCCESS";
export const DELETE_INSTRUCTORS_FAIL = "DELETE_INSTRUCTORS_FAIL";

export const deleteInstructor = instructor => dispatch => {

    dispatch( { type: DELETE_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" ).doc( instructor.id )
        .delete()
        .then( res => {

            console.log( res );
            dispatch( {
                type: DELETE_INSTRUCTORS_SUCCESS, payload: instructor,
            } );
        } )
        .catch( err => {
            dispatch( { type: DELETE_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const GET_INSTRUCTORS_INIT = "GET_INSTRUCTORS_INIT";
export const GET_INSTRUCTORS_SUCCESS = "GET_INSTRUCTORS_SUCCESS";
export const GET_INSTRUCTORS_FAIL = "GET_INSTRUCTORS_FAIL";

export const getInstructors = () => dispatch => {
    dispatch( { type: GET_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" )
        .orderBy( "name", "asc" )
        .get()
        .then( instructors => {
            let instructorArray = [];
            instructors.forEach( instructor => {
                instructorArray.push( {
                    ...instructor.data(), id: instructor.id
                } );
            } );
            dispatch( {
                type: GET_INSTRUCTORS_SUCCESS, payload: instructorArray,
            } );
        } )
        .catch( err => {
            dispatch( { type: GET_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const ADD_INSTRUCTORS_INIT = "ADD_INSTRUCTORS_INIT";
export const ADD_INSTRUCTORS_SUCCESS = "ADD_INSTRUCTORS_SUCCESS";
export const ADD_INSTRUCTORS_FAIL = "ADD_INSTRUCTORS_FAIL";

export const addInstructor = instructor => dispatch => {
    dispatch( { type: ADD_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" )
        .add( instructor )
        .then( res => {
            console.log( res );
            dispatch( {
                type: ADD_INSTRUCTORS_SUCCESS, payload: instructor,
            } );
        } )
        .catch( err => {
            dispatch( { type: ADD_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const GET_TAS_INIT = "GET_TAS_INIT";
export const GET_TAS_SUCCESS = "GET_TAS_SUCCESS";
export const GET_TAS_FAIL = "GET_TAS_FAIL";

export const getTas = () => dispatch => {
    
    dispatch( { type: GET_TAS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" )
        .get()
        .then( tas => {
            let tasArray = [];
            tas.forEach( ta => {
                tasArray.push( { ...ta.data(), id: ta.id } );
            } );
            dispatch( {
                type: GET_TAS_SUCCESS, payload: tasArray,
            } );
        } )
        .catch( err => {
            dispatch( { type: GET_TAS_FAIL, payload: err } );
        } );
};

export const UPDATE_TAS_INIT = "UPDATE_TAS_INIT";
export const UPDATE_TAS_SUCCESS = "UPDATE_TAS_SUCCESS";
export const UPDATE_TAS_FAIL = "UPDATE_TAS_FAIL";

export const updateTa = (ta) => dispatch => {

    dispatch( { type: UPDATE_TAS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" ).doc(ta.id)
        .update(ta)
        .then( res => {
            dispatch({type: UPDATE_TAS_SUCCESS, payload: ta});
        } )
        .catch( err => {
            dispatch( { type: UPDATE_TAS_FAIL, payload: err } );
        } );
};

export const DELETE_TAS_INIT = " DELETE_TAS_INIT";
export const DELETE_TAS_SUCCESS = " DELETE_TAS_SUCCESS";
export const DELETE_TAS_FAIL = " DELETE_TAS_FAIL";

export const deleteTa = (ta) => dispatch => {

    dispatch( { type: DELETE_TAS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" ).doc(ta.id)
        .delete()
        .then( res => {
            dispatch({type: DELETE_TAS_SUCCESS, payload: ta});
        } )
        .catch( err => {
            dispatch( { type: DELETE_TAS_FAIL, payload: err } );
        } );
};

export const ADD_TAS_INIT = " ADD_TAS_INIT";
export const ADD_TAS_SUCCESS = " ADD_TAS_SUCCESS";
export const ADD_TAS_FAIL = " ADD_TAS_FAIL";

export const addTa = (ta) => dispatch => {

    dispatch( { type: ADD_TAS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" )
        .add(ta)
        .then( res => {
            ta.id = res.id;
            dispatch({type: ADD_TAS_SUCCESS, payload: ta});
        } )
        .catch( err => {
            dispatch( { type: ADD_TAS_FAIL, payload: err } );
        } );
};


// export const makeSections = () => dispatch => {
//   const lessons = [
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
//   lessons.forEach((section, index) => {
//     console.log({
//       order: index + 1,
//       name: section,
//       isProject: (index + 1) % 5 === 0 ? false : true,
//     });
//     store.collection('autoFill').doc('web').collection('lessons').add({
//       order: index + 1,
//       name: section,
//       isProject: (index + 1) % 5 === 0 ? false : true,
//     })
//   });
// };
