// TestWelcomeRoutes.tsx
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import TestWelcome from "../../pages/TestWelcome/TestWelcome";
import EvalAPI, { GetRoutesResponse } from "../../apis/EvalAPI";
import EvaluationTest from "../../pages/EvalTest/EvaluationTest";
import Evaluation, {
  EvaluationTestElement,
} from "../../pages/Evaluation/Evaluation";
import useUserData from "../../hooks/useUserData";
import { User } from "firebase/auth";
import { auth } from "../../configs/firebase";

const EvaluationTestRoutes = () => {
  const [routes, setRoutes] = useState<GetRoutesResponse[] | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!routes) {
          const fetchRoutes = async () => {
            const dynamicRoutes = await EvalAPI.getRoutes();
            setRoutes(dynamicRoutes);
          };
          fetchRoutes();
        }
      }
    });
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
                    testRoutePath={`${route.name}-test`}
                    heading={route.welcome.heading}
                    headingInner={route.welcome.heading_inner}
                    content={route.welcome.instructions}
                    illustration={route.welcome.img_url}
                    assessment_generation_id={route.assessment_generation_id}
                  />
                </ProtectedRoute>
              }
            />
          ))}
          {routes.map((route) => (
            <Route
              key={`${route.name}-test`}
              path={`${route.name}-test`}
              element={
                <ProtectedRoute>
                  <EvaluationTest title={route.test.heading} des1="" des2="" />
                </ProtectedRoute>
              }
            />
          ))}
          {(() => {
            let tests: EvaluationTestElement[] = [];
            routes.map((route) => {
              tests.push({
                heading: route.eval_home.heading,
                img_url: route.eval_home.img_url,
                name: route.name,
              });
            });
            return (
              <Route
                path="/evaluation"
                element={
                  <ProtectedRoute>
                    <Evaluation tests={tests} />
                  </ProtectedRoute>
                }
              />
            );
          })()}
        </Routes>
      )}
    </>
  );
};

export default EvaluationTestRoutes;
