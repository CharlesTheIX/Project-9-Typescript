'use client';

import TextInput from '../Inputs/TextInput';
import MultiTextInput from '../Inputs/MultiTextInput';
import FunctionalButton from '../Buttons/FunctionalButton';

const CountryCreationForm: React.FC = () => {
  return (
    <>
      <form>
        <div>
          {/* Single text input */}
          <TextInput name="display-name" />

          {/* Multi text input */}
          <MultiTextInput name="names" />

          {/* Select input */}
          <div>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Rectangle input */}
          <div>
            <input type="hidden" name="flag-rectangle" id="flag-rectangle" />

            <div>
              <label htmlFor="flag-rectangle-x">X</label>
              <input type="number" step={1} name="flag-rectangle-x" id="flag-rectangle-x" />
            </div>

            <div>
              <label htmlFor="flag-rectangle-y">Y</label>
              <input type="number" step={1} name="flag-rectangle-y" id="flag-rectangle-y" />
            </div>

            <div>
              <label htmlFor="flag-rectangle-width">Width</label>
              <input type="number" step={1} name="flag-rectangle-width" id="flag-rectangle-width" />
            </div>

            <div>
              <label htmlFor="flag-rectangle-height">Height</label>
              <input type="number" step={1} name="flag-rectangle-height" id="flag-rectangle-height" />
            </div>
          </div>

          {/* Rectangle input */}
          <div>
            <input type="hidden" name="world-rectangle" id="world-rectangle" />

            <div>
              <label htmlFor="world-rectangle-x">X</label>
              <input type="number" step={1} name="world-rectangle-x" id="world-rectangle-x" />
            </div>

            <div>
              <label htmlFor="world-rectangle-y">Y</label>
              <input type="number" step={1} name="world-rectangle-y" id="world-rectangle-y" />
            </div>

            <div>
              <label htmlFor="world-rectangle-width">Width</label>
              <input type="number" step={1} name="world-rectangle-width" id="world-rectangle-width" />
            </div>

            <div>
              <label htmlFor="world-rectangle-height">Height</label>
              <input type="number" step={1} name="world-rectangle-height" id="world-rectangle-height" />
            </div>
          </div>
        </div>
      </form>

      <div>
        <FunctionalButton callback={() => {}} content="Submit" />
      </div>
    </>
  );
};

export default CountryCreationForm;
