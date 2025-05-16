'use client';

import { ChangeEvent, useState } from 'react';

const Home: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState<string>('');
  const [currentName, setCurrentName] = useState<string>('');

  useEffect(()= >{ 
  const fetchCountries = async (): Promise<APIResponse> => {
    const response = await fetch ('/api/countries/all', {
      method: 'POST'
      body: JSOn.parse({

      })
    }).then((res) => res.json());

    if (response.error) =>

      if (response.status)

        data = response_SERVER_ERROR.data....
  }

  fetchsadfkjshdf();
}, [],

  return (
    <main className="flex flex-col gap-5 p-5">
      <section>
        <div>
          <h1>Home Page</h1>
        </div>
      </section>

      <section>
        <div>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="display-name">Display Name</label>
              <input
                type="text"
                name="display-name"
                id="display-name-input"
                value={displayName}
                onChange={(event: any) => {
                  const target = event.currentTarget || event.target;
                  setDisplayName(target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="current-name">Names</label>
              <input
                type="text"
                name="current-name"
                id="current-name-input"
                value={currentName}
                onChange={(event: any) => {
                  const target = event.currentTarget || event.target;
                  setCurrentName(target.value);
                }}
              />
              <button
                onClick={() => {
                  if (!currentName) return;
                  setNames((prevValue: string[]) => [...prevValue, currentName]);
                }}
              >
                Add
              </button>

              <div>
                <p>{names.join(', ')}</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
