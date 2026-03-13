import React, { Suspense } from "react";

const RemoteButton = React.lazy(() =>
  import("remoteButton/Button").catch(() => ({
    default: () => <div>Remote Button unavailable</div>,
  }))
);
const RemoteCard = React.lazy(() =>
  import("remoteCard/Card").catch(() => ({
    default: () => <div>Remote Card unavailable</div>,
  }))
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong loading a remote component.</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteButton />
        <RemoteCard />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
