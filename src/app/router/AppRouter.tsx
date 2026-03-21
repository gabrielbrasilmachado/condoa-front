import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RequireAuth } from '@/modules/auth/components/RequireAuth'
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'
import { AdminAddressesPage } from '@/modules/addresses/pages/AdminAddressesPage'
import { AdminCategoriesPage } from '@/modules/categories/pages/AdminCategoriesPage'
import { AdminCondominiumsPage } from '@/modules/condominiums/pages/AdminCondominiumsPage'
import { ItemsPage } from '@/modules/items/pages/ItemsPage'
import { AdminUsersPage } from '@/modules/users/pages/AdminUsersPage'
import { AppShell } from '@/shared/layout/AppShell'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="condominiums" element={<AdminCondominiumsPage />} />
        <Route path="addresses" element={<AdminAddressesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
