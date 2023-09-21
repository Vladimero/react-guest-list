import React, { useEffect, useState } from 'react';

export default function App() {
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');
  const [allAddedGuests, setAllAddedGuests] = useState([]); // set an empty array for saving the added guest there
  // const [isLoading, setIsLoading] = useState(true);
  const [attending, setAttending] = useState(false);

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      setFirstNameText('');
      setLastNameText('');
      const newGuest = [
        ...allAddedGuests,
        {
          firstName: firstNameText,
          lastName: lastNameText,
          attending: 'not attending',
        },
      ];
      setAllAddedGuests(newGuest);
    }
  };

  const baseUrl = 'http://localhost:4000';

  // Getting ALL guests
  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
    }
    getAllGuests().catch((error) => {
      console.log(error);
    });
  }, [allAddedGuests]); // triggers every time the allAddedGuests changes

  // Getting a SINGLE guest
  useEffect(() => {
    async function getOneGuest() {
      const response = await fetch(`${baseUrl}/guests/:id`);
      const guest = await response.json();
    }
    getOneGuest().catch((error) => {
      console.log(error);
    });
  }, []);

  // Creating a NEW guest
  useEffect(() => {
    async function createNewGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: allAddedGuests[allAddedGuests.length - 1].firstName,
          lastName: allAddedGuests[allAddedGuests.length - 1].lastName,
        }),
      });
      const createdGuest = await response.json();
    }
    createNewGuest().catch((error) => {
      console.log(error);
    });
  }, [allAddedGuests]); // triggers every time the allAddedGuests changes

  // Updating a guest
  useEffect(() => {
    async function updateGuest() {
      const response = await fetch(`${baseUrl}/guests/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
    }
    updateGuest().catch((error) => {
      console.log(error);
    });
  }, []);

  //  While the guest list is first loaded from the API (on page load):
  /* useEffect(() => {
    async function handleLoading() {
      const response = await fetch(`${baseUrl}/guests`);

      const data = await response.json();

      setAllAddedGuests([data.results[0]]);

      setIsLoading(false);
    }

    handleLoading().catch((error) => {
      console.log(error);
    });
  }, []);

  if (isLoading) {
    return 'Loading...';
  }
  */

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
            <div>
              <button aria-label="Remove <First Name> <Last Name>">
                <span>Remove</span>
              </button>
            </div>
            <br />
            <br />
            <div>
              <label htmlFor="Attend status">attending</label>
              <input
                aria-label="<First Name> <Last Name> attending status"
                type="checkbox"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
