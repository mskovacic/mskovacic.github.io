import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { type Route } from "./+types/root";
import "./app.css";
import MyAppBar from "./components/mainAppBar";
import { useEffect, useRef } from "react";
import { faro } from '@grafana/faro-react';

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <Meta />
        <meta name="description" content="TMartin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences." />

        <meta property="og:title" content="Martin Sven Kovačić AI powered portfolio" />
        <meta property="og:description" content="Martin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences." />
        <meta property="og:url" content="https://mskovacic.github.io" />
        <meta property="og:site_name" content="MSKovacic" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mskovacic.github.io/public/profile.webp" />

        <meta name="twitter:image" content="https://mskovacic.github.io/public/profile.webp" />
        <meta name="twitter:url" content="https://mskovacic.github.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Martin Sven Kovačić AI powered portfolio" />
        <meta name="twitter:description" content="Martin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences." />
        <Links />
      </head>
      <body>
        <MyAppBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
const location = useLocation();
  const previousPath = useRef(location.pathname);
  
  useEffect(() => {
    // Track navigation
    faro.api.pushEvent('route_change', {
      from: previousPath.current,
      to: location.pathname,
    });

    // Track page view
    faro.api.setView({
      name: location.pathname,
    });

    previousPath.current = location.pathname;
  }, [location]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}