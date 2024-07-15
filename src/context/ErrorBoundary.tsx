import { FC, PropsWithChildren, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function fallbackRender({ error }: FallbackProps) {
  useEffect(() => {
    console.error("ErrorBoundary: ", error);
  }, [error]);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const ErrorBoundaryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  );
};
