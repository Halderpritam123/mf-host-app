import React, { Suspense } from "react";

const RemoteButton = React.lazy(() => import("remoteButton/Button"));
const RemoteCard = React.lazy(() => import("remoteCard/Card"));

const App = () => {
  return (
    <div>
      <h1>Host Application</h1>

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
