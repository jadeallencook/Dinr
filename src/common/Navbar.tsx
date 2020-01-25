import React from 'react';
import './Navbar.scss';
import states from '../assets/states.json';
import { Link } from 'react-router-dom';

interface NavbarProps {
  setSearchState: any;
  searchState: string;
  setSearchCity: any;
  searchCity: string;
}

const Navbar: React.FC<NavbarProps> = props => {

  const searchStateHandler = (event: any): void => {
    props.setSearchState(event.target.value);
  }

  const searchCityHandler = (event: any): void => {
    props.setSearchCity(event.target.value);
  }

  return (
    <nav className="Navbar">
      <div>
        <Link to="/">DINR</Link>
      </div>
      <div>
        <input
          onChange={searchCityHandler}
          placeholder="City"
          type="text"
          value={props.searchCity || ''} />
        <select
          onChange={searchStateHandler}
          value={props.searchState || ''}
          >
          {
            states.map((state: string) => {
              return (
                <option
                  key={state}
                  value={state}
                >
                  {state.toUpperCase()}
                </option>
              );
            })
          }
        </select>
      </div>
      <div>
        <Link to="/account">
          <img src="assets/default-profile.png" alt="Default profile" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
