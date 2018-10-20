import React from "react";
import { Redirect } from "react-router";

import PlayedWithPersonList from '../../components/PlayedWithPersonList';

const PersonDetail = props => {
  if (props.location && props.location.state) {
    const { person } = props.location.state;

    return (
      <div>
        <h2>{person.name}</h2>
        {person.birthYear && <p>birth year: {person.birthYear}</p>}
        {person.gender && <p>gender: {person.gender}</p>}
        {person.height && <p>height: {person.height}</p>}
        <PlayedWithPersonList person={person} />
      </div>
    );
  } else return <Redirect to="/" />;
};

export default PersonDetail;
