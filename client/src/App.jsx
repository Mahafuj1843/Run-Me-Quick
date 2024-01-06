import { Fragment, Suspense } from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LazyLoader from "./components/LazyLoader";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <Suspense fallback={<LazyLoader />}>
                <RegistrationPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LazyLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <ScreenLoader /> */}
      <Toaster position="top-center" />
    </Fragment>
  )
}

export default App
