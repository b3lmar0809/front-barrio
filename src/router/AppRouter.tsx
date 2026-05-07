/**
 * AppRouter class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import DashboardTemplate from '../components/templates/DashboardTemplate/DashboardTemplate'
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import PosPage from '../pages/PosPage/PosPage'
import InventoryPage from '../pages/InventoryPage/InventoryPage'
import SalesPage from '../pages/SalesPage/SalesPage'
import FinancePage from '../pages/FinancePage/FinancePage'
import ReportsPage from '../pages/ReportsPage/ReportsPage'
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

const DashboardLayout: React.FC = () => (
    <DashboardTemplate>
        <Outlet />
    </DashboardTemplate>
)

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />

            <Route element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/pos" element={<PosPage />} />
                    <Route path="/inventario" element={<InventoryPage />} />
                    <Route path="/ventas" element={<SalesPage />} />
                    <Route path="/finanzas" element={<FinancePage />} />
                    <Route path="/reportes" element={<ReportsPage />} />
                    <Route path="/notificaciones" element={<NotificationsPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter
