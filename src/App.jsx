import React, { Suspense } from "react";

const RemoteButton = React.lazy(() => import("remoteButton/Button"));
const RemoteCard = React.lazy(() => import("remoteCard/Card"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteButton />
      <RemoteCard />
    </Suspense>
  );
};

export default App;
