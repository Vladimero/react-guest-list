import React, { useEffect, useState } from 'react';
import styles from './index.css';

export default function App() {
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');
  const [allAddedGuests, setAllAddedGuests] = useState([]);
  const [participation, setParticipation] = useState('not attending');

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      setFirstNameText('');
      setLastNameText('');
      const newGuest = [
        ...allAddedGuests,
        {
          firstName: firstNameText,
          lastName: lastNameText,
          attending: participation,
        },
      ];
      setAllAddedGuests(newGuest);
    }
  };

  const baseUrl = 'http://localhost:4000';

  // Creating a NEW guest
  const addGuest = async (allAddedGuests) => {
    try {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: setAllAddedGuests[setAllAddedGuests.length - 1].firstName,
          lastName: setAllAddedGuests[setAllAddedGuests.length - 1].lastName,
        }),
      });
      const allGuests = await response.json();
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  // delete a guest
  async function handleRemove(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
  }

  return (
    <main>
      <div data-test-id="guest">
        <div>
          <header>
            <h1>React Guest List</h1>
          </header>
        </div>

        <div>
          <form onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="First Name">First Name:</label>
              <input
                type="Text"
                value={firstNameText}
                placeholder=""
                onChange={(event) =>
                  setFirstNameText(event.currentTarget.value)
                }
              />
            </div>
            <br />
            <br />
            <div>
              <label htmlFor="Last Name">Last Name:</label>
              <input
                type="Text"
                value={lastNameText}
                placeholder=""
                onChange={(event) => setLastNameText(event.currentTarget.value)}
                onKeyUp={handleKeyEnter}
              />
            </div>
          </form>
          <br />
          <br />
          <form onSubmit={(event) => event.preventDefault()}>
            <ul>
              {allAddedGuests.map((guest) => (
                <li key={`user-${guest.id}`}>
                  {guest.firstName} {guest.lastName}{' '}
                  <label htmlFor="Attend status">Attending Status:</label>
                  {JSON.stringify(participation)}
                  <input
                    aria-label="<First Name> <Last Name> attending status"
                    type="checkbox"
                    checked={guest.participation}
                    onChange={() => {
                      setParticipation((prevParticipation) =>
                        prevParticipation === 'attending'
                          ? 'not attending'
                          : 'attending',
                      );
                    }}
                  />
                  <button
                    onClick={handleRemove}
                    aria-label="Remove <First Name> <Last Name>"
                  >
                    <span>Remove</span>
                  </button>
                </li>
              ))}
            </ul>
            <br />
            <br />
          </form>
        </div>
      </div>
    </main>
  );
}
