'use client';

import * as gbl from '@/globals';
import { useState, useEffect } from 'react';
import LoadingContainer from '../Misc/LoadingContainer';
import getAllCountries from '@/lib/countries/getAllCountries';

const CountryFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getAllCountries();
        if (response.error) throw new Error(response.message);
        setCountries(response.data || []);
      } catch (error: any) {
        console.error(`Get all countries error: ${error.message}.`);
        setCountries([]);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <div>
        {isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {countries.length === 0 ? (
              <p>No countries to display.</p>
            ) : (
              <>
                {countries.map((country: Country) => {
                  <p>{country.displayName}</p>;
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountryFeed;
