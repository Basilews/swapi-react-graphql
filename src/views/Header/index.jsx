import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import routes from './constants';

import './styles.css';

class Header extends Component {
  render () {
    const { pathname } = this.props.location;

    return (
      <header className="header">
        {routes.map(route => {
          const isActive = pathname === route.path;

          return (
            <div key={route.key} className={classNames('route', { isActive })}>
              <Link to={route.path}>{route.name}</Link>
            </div>
          )}
        )}
      </header>
    )
  }
};

export default withRouter(Header);
