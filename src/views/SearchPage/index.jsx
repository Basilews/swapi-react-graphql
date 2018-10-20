import React, { Component, Fragment } from "react";
import { withApollo, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import PersonList from '../../components/PersonList';

const GET_PERSON_LIST = gql`query ($PersonFilter: String!) {
  allPersons(filter: { name_contains: $PersonFilter }) {
    id
    name
    birthYear
    gender
    height
    species(filter: {name: "Human"}) {
      name
    }
    films(orderBy: episodeId_ASC) {
      id
      episodeId
      characters {
        id
        name
        species(filter: {name:"Human"}) {
          name
        }
        films {
          id
        }
      }
    }
  }
}`;

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personList: null,
      isLoading: false
    };

    this.searchInput = React.createRef();
  }

  onPersonsFetched = (personList) => {
    this.setState({ personList, isLoading: false });
  };

  onSubmit = async (client, event) => {
    if (this.searchInput.current.value) event.preventDefault();
    else return;

    this.setState({ isLoading: true });

    const { data } = await client.query({
      query: GET_PERSON_LIST,
      variables: {
        PersonFilter: this.searchInput.current.value
      }
    });

    const personList = data.allPersons.filter(person => person.species.length > 0)

    this.onPersonsFetched(personList);
  };

  render() {
    const { personList, isLoading } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <Fragment>
            <h2>Enter a name:</h2>
            <form>
              <input
                type="text"
                placeholder="Max Mustermann"
                ref={this.searchInput}
                required
                autoFocus
              />
              <br />
              <button onClick={event => this.onSubmit(client, event)}>
                search
              </button>
            </form>
            <br />
            {isLoading && <p>Loading...</p>}
            {personList &&
              !isLoading &&
              personList.length === 0 && <p>Nothing found :(</p>
            }
            {personList && !isLoading && (
              <Fragment>
                <h2>Here are results:</h2>
                <PersonList persons={personList} />
              </Fragment>
            )}
          </Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default withApollo(SearchPage);
