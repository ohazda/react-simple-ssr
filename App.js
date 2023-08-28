import React from 'react';

import { useState } from 'react';
import { SSRProvider, useId } from 'react-aria';

const MockComponent1 = () => {
  const id = useId();

  return (
    <div data-testid="MockComponent1" id={id}>
      {id}
    </div>
  );
};

const MockComponent2 = () => {
  const id = useId();

  return (
    <div data-testid="MockComponent2" id={id}>
      {id}
    </div>
  );
};

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SSRProvider>
      <MockComponent1 />
      <button onClick={() => setCount(count + 1)}>Click</button>
      {count > 0 ? <MockComponent2 /> : null}
    </SSRProvider>
  );
}
