import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import App from './App.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import DashBoardScreen from './screens/DashBoardScreen.jsx';
import NutritionScreen from './screens/NutritionScreen.jsx';
import FoodScreen from './screens/FoodScreen.jsx';
import FitnessScreen from './screens/FitnessScreen.jsx';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen.jsx';
import UserDashboard from './screens/UserDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* index={true} is the same as just index */}
      <Route index={true} element={<WelcomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/dashboard' element={<DashBoardScreen />} />
      <Route path='/dashboard/:id' element={<UserDashboard />} />
      <Route path='/nutrition' element={<NutritionScreen />} />
      <Route path='/fitness' element={<FitnessScreen />} />
      <Route path='/fitness/create-workout' element={<CreateWorkoutScreen />} />
      <Route
        path='/fitness/repeat-workout/:id'
        element={<CreateWorkoutScreen />}
      />
      <Route path='/nutrition/:id' element={<FoodScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
