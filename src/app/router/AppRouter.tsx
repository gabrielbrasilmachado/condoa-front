import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RequireAuth } from '@/modules/auth/components/RequireAuth'
import { RequireRole } from '@/modules/auth/components/RequireRole'
import { AdminAddressesPage } from '@/modules/addresses/pages/AdminAddressesPage'
import { AdminCategoriesPage } from '@/modules/categories/pages/AdminCategoriesPage'
import { CondominiumsPage } from '@/modules/condominiums/pages/CondominiumsPage'
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'
import { CreateItemPage } from '@/modules/items/pages/CreateItemPage'
import { EditItemPage } from '@/modules/items/pages/EditItemPage'
import { ItemDetailsPage } from '@/modules/items/pages/ItemDetailsPage'
import { MyItemsPage } from '@/modules/items/pages/MyItemsPage'
import { SearchItemsPage } from '@/modules/items/pages/SearchItemsPage'
import { AboutPage } from '@/modules/landing/pages/AboutPage'
import { LandingPage } from '@/modules/landing/pages/LandingPage'
import { ProfilePage } from '@/modules/profile/pages/ProfilePage'
import { RegisterUserPage } from '@/modules/users/pages/RegisterUserPage'
import { AdminUsersPage } from '@/modules/users/pages/AdminUsersPage'
import { AppShell } from '@/shared/layout/AppShell'

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterUserPage />} />

      <Route
        path='/app'
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='items' element={<Navigate to='/app/items/search' replace />} />
        <Route path='items/mine' element={<MyItemsPage />} />
        <Route path='items/mine/new' element={<CreateItemPage />} />
        <Route path='items/mine/:id/edit' element={<EditItemPage />} />
        <Route path='items/search' element={<SearchItemsPage />} />
        <Route path='user/items/:id' element={<ItemDetailsPage />} />
        <Route path='condominiums' element={<CondominiumsPage />} />

        <Route
          path='users'
          element={
            <RequireRole allowedRoles={['admin']}>
              <AdminUsersPage />
            </RequireRole>
          }
        />
        <Route
          path='categories'
          element={
            <RequireRole allowedRoles={['admin']}>
              <AdminCategoriesPage />
            </RequireRole>
          }
        />
        <Route
          path='addresses'
          element={
            <RequireRole allowedRoles={['admin']}>
              <AdminAddressesPage />
            </RequireRole>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
