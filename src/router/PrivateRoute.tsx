/**
 * PrivateRoute class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
