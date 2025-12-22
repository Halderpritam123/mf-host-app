import React, { Suspense, useEffect, useState } from "react";
import { counterStore } from "remoteButton/counterStore";

const RemoteButton = React.lazy(() => import("remoteButton/Button"));
const RemoteCard = React.lazy(() => import("remoteCard/Card"));

const App = () => {
  const [count, setCount] = useState(counterStore.getCount());

  useEffect(() => {
    return counterStore.subscribe(setCount);
  }, []);

  return (
    <div>
      <h1>Host Application</h1>
      <h2>Shared Count in Host: {count}</h2>

      <Suspense fallback={<div>Loading Button...</div>}>
        <RemoteButton />
      </Suspense>

      <Suspense fallback={<div>Loading Card...</div>}>
        <RemoteCard />
      </Suspense>
    </div>
  );
};

export default App;
