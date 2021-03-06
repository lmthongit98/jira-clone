import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import Auth from './features/Auth';
import Login from './features/Auth/pages/Login';
import Register from './features/Auth/pages/Register';
import ProjectFeature from './features/Project';
import ProjectDetail from './features/Project/pages/ProjectDetail';
import ProjectList from './features/Project/pages/ProjectManagement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/project" element={<ProjectFeature />}>
          <Route path="" element={<Navigate to="list" />} />
          <Route path="list" element={<ProjectList />} />
          <Route path=":projectId" element={<ProjectDetail />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
