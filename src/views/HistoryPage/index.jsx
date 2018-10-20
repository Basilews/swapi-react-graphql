import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PersonList from '../../components/PersonList';

class HistoryPage extends  Component {
  render() {
    const { viewedPersonList } = this.props;

    return (
      <div>
        {viewedPersonList && viewedPersonList.length > 0
          ? (
            <Fragment>
              <h2>Persons you had already viewed:</h2>
               <PersonList persons={viewedPersonList} />
            </Fragment>
          )
          : (
            <Fragment>
              <h2>You hadn't seen anybody yet.</h2>
              <Link to="/">
                <p>Get back to search page</p>
              </Link>
            </Fragment>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    viewedPersonList: state.viewedPersonList,
  };
}

export default connect(mapStateToProps)(HistoryPage);
