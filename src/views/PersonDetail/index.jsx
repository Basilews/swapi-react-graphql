import React from "react";
import { Redirect } from "react-router";

const PersonDetail = props => {
  if (props.location && props.location.state) {
    const { person } = props.location.state;

    return (
      <div>
        <h2>{person.name}</h2>
        <p>birth year: {person.birthYear}</p>
        <p>gender: {person.gender}</p>
        <p>height: {person.height}</p>
      </div>
    );
  } else return <Redirect to="/" />;
};

export default PersonDetail;
