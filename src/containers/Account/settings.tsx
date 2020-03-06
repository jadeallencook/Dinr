import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';

const SettingsComponent: React.FC = () => {
  const user = useSelector(state => state['user']);
  const profile = useSelector(state => state['profile']);
  const dispatch = useDispatch();
  return (
    <div className="SettingsComponent">
      <h2>Account Settings</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const form: any = event.target;
          const name: string = form.querySelector('input#name').value;
          const street: string = form.querySelector('input#street').value;
          const zipcode: number = Number(
            form.querySelector('input#zipcode').value
          );
          firebase
            .database()
            .ref(`profiles/${user.uid}`)
            .set({
              ...profile,
              ...{ personal: { name, street, zipcode } }
            })
            .then(() => {
              dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                  type: 'primary',
                  text: 'Successfully saved your changes!'
                }
              });
            }).catch((error: any) => {
              dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                  type: 'secondary',
                  text: error.message
                }
              });
            });
        }}
      >
        <p id="email">{user.email}</p>
        <label>Name</label>
        <input
          type="text"
          className="brand margin-bottom"
          placeholder="Jane Smith"
          id="name"
          defaultValue={profile?.personal?.name}
        />
        <label>Street Address</label>
        <input
          type="text"
          className="brand margin-bottom"
          placeholder="123 Main Street"
          id="street"
          defaultValue={profile?.personal?.street}
        />
        <label>Zipcode</label>
        <input
          type="number"
          className="brand margin-bottom"
          placeholder="48708"
          id="zipcode"
          defaultValue={profile?.personal?.zipcode || null}
        />
        <br />
        <br />
        <input
          className="brand primary-bg margin-right margin-bottom"
          type="submit"
          value="Save Changes"
        />
        <button
          className="brand brand-bg"
          onClick={event => {
            event.preventDefault();
            firebase
              .auth()
              .signOut()
              .then(() => {})
              .catch(error => {});
          }}
        >
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsComponent;