import { PERSON_LIST_ADD_PERSON } from "../constants";

const initialState = {
  viewedPersonList: []
};

const checkIfExists = (person, state) => {
  const idList = state.viewedPersonList.map(person => person.id);
  return idList.includes(person.id) ? true : false;
}

export default function personList(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case PERSON_LIST_ADD_PERSON:
      const newList = checkIfExists(action.person, state)
        ? null
        : state.viewedPersonList.push(action.person);
      return {
        ...state,
        ...newList
      };
    default:
      return state;
  }
}
