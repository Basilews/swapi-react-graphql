import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as PersonListActions from "../../actions/PersonListActions";
import './styles.css';

class PersonList extends React.Component {
  render() {
    const { persons } = this.props;
    const { addPerson } = this.props.PersonListActions;

    return (
      <ul>
        {persons.map(person => (
          <li key={person.id} className="person">
            <Link
              to={{
                pathname: `/person/${person.id}`,
                state: { person }
              }}
              onClick={() => addPerson(person)}
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    PersonListActions: bindActionCreators(PersonListActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(PersonList);
