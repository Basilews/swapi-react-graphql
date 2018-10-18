import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as PersonListActions from "../../../../actions/PersonListActions";

class PersonList extends React.Component {
  render() {
    const { persons } = this.props;
    const { addPerson } = this.props.PersonListActions;

    return (
      <div>
        <h2>Here are results:</h2>
        <ul>
          {persons.map(person => (
            <li key={person.id}>
              <Link
                to={{
                  pathname: `/person/${person.id}`,
                  state: { person }
                }}
                onClick={person => addPerson(person)}
              >
                {person.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    PersonListActions: bindActionCreators(PersonListActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(PersonList);
