import { PERSON_LIST_ADD_PERSON } from "../constants";

const initialState = {
  viewedPersonList: []
};

export default function personList(state = initialState, action) {
  switch (action.type) {
    case PERSON_LIST_ADD_PERSON:
      const newList = state.viewedPersonList.push(action.person);
      return {
        ...state,
        ...newList
      };
    default:
      return state;
  }
}
