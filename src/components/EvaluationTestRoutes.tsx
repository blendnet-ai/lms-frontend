// TestWelcomeRoutes.tsx
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import TestWelcome from "../pages/TestWelcome";
import EvalAPI, { GetRoutesResponse } from "../apis/EvalAPI";

const EvaluationTestRoutes = () => {
  const [routes, setRoutes] = useState<GetRoutesResponse[] | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      const dynamicRoutes = await EvalAPI.getRoutes();
      setRoutes(dynamicRoutes);
    };
    fetchRoutes();
  }, []);

  return (
    <>
      {routes && (
        <Routes>
          {routes.map((route) => (
            <Route
              key={`${route.name}-welcome`}
              path={`${route.name}-welcome`}
              element={
                <ProtectedRoute>
                  <TestWelcome
                    heading={route.welcome.heading}
                    headingInner={route.welcome.heading_inner}
                    content={route.welcome.instructions}
                    illustration="communication-skills.svg"
                  />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      )}
    </>
  );
};

export default EvaluationTestRoutes;
