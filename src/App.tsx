// App.tsx
import { Router, Route, Navigate } from '@solidjs/router';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import About from './pages/About';
import Todolist from './pages/todolis/Todolist';

export default function App() {
  return (
    <Router>
      <Route path="/" component={() => <Navigate href="/dashboard" />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/todolist" component={Todolist} />
    </Router>
  );
}
