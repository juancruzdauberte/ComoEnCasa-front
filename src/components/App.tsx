import { ProtectedRoutes } from "./config/ProtectedRoutes";
import { Login } from "./pages/public/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { NotFound } from "./pages/public/NotFound";
import { AdminHome } from "./pages/admin/AdminHome";
import { ClientHome } from "./pages/user/ClientHome";
import { Toaster } from "sonner";
import { AdminLayout } from "./config/AdminLayout";
import { Unauthorized } from "./pages/public/Unauthorized";
import { Failure } from "./pages/public/Failure";
import { AuthSuccess } from "./pages/public/AuthSuccess";
import { AuthProvider } from "./provider/AuthProvider";
import { EditOrder } from "./pages/admin/EditOrder";
import { CreateOrder } from "./pages/admin/CreateOrder";
import { ProductPage } from "./pages/admin/ProductPage";
import { Finances } from "./pages/admin/Finances";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster richColors duration={2500} closeButton />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} index />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<ProtectedRoutes role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="/admin/order" element={<CreateOrder />} />
              <Route path="/admin/order/:id" element={<EditOrder />} />
              <Route path="/admin/product" element={<ProductPage />} />
              <Route path="/admin/finance" element={<Finances />} />
            </Route>
          </Route>
          <Route path="/user" element={<ProtectedRoutes role="user" />}>
            <Route index element={<ClientHome />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
