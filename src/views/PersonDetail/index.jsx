import React, { Component } from "react";
import { Redirect } from "react-router";
import gql from "graphql-tag";

import PlayedWithPersonList from '../../components/PlayedWithPersonList';

const GET_PERSON_DETAIL = gql`query ($PersonFilter: ID!) {
  Person(id: $PersonFilter) {
    films(orderBy: episodeId_ASC) {
      id
      episodeId
      characters {
        id
        name
        birthYear
        gender
        height
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

class PersonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    if (!this.state.films.length) this.fetchFilms(this.props.location.state.person, this.props.client);
  }

  componentDidUpdate(prevProps) {
    const { id: prevPersonId } = prevProps.location.state.person;
    const { id: currentPersonId } =  this.props.location.state.person;
    if (prevPersonId !== currentPersonId) {
      this.setState({ films: [] });
      this.fetchFilms(this.props.location.state.person, this.props.client);
    }
  }

  async fetchFilms(person, client) {
    this.setState({ isLoading: true });

    const { data } = await client.query({
      query: GET_PERSON_DETAIL,
      variables: {
        PersonFilter: person.id,
      }
    });

    this.setState({ films: data.Person.films, isLoading: false });
  }

  render() {
    if (this.props.location && this.props.location.state) {
      const { person } = this.props.location.state;
      const { films, isLoading } = this.state;

      return (
          <div>
            <h2>{person.name}</h2>
            {person.birthYear && <p>birth year: {person.birthYear}</p>}
            {person.gender && <p>gender: {person.gender}</p>}
            {person.height && <p>height: {person.height}</p>}
            {isLoading && <p>Loading...</p>}
            {films.length > 0 && <PlayedWithPersonList person={{ ...person, ...{ films } }} />}
          </div>
      );
    } else return <Redirect to="/" />;
  }
};

export default PersonDetail;
