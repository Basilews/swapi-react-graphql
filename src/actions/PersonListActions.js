import { PERSON_LIST_ADD_PERSON } from "../constants";

export function addPerson(person) {
  return { type: PERSON_LIST_ADD_PERSON, person };
}
