/**
 * DashboardTemplate class
 * @Version: 1.1.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { clearUser } from '../../../app/Store'
import { logoutUser } from '../../../api/AuthApi'
import { getProducts } from '../../../api/ProductApi'
import Sidebar from '../../organisms/Sidebar/Sidebar'
import Navbar from '../../organisms/Navbar/Navbar'
import styles from './DashboardTemplate.module.css'

interface DashboardTemplateProps {
    children: React.ReactNode
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
    const dispatch    = useAppDispatch()
    const navigate    = useNavigate()
    const companyName = useAppSelector((s) => s.user.companyName)
    const userName    = useAppSelector((s) => s.user.name)
    const userId      = useAppSelector((s) => s.user.id)

    const [sidebarOpen,   setSidebarOpen]   = useState(false)
    const [productCount,  setProductCount]  = useState(0)

    useEffect(() => {
        if (!userId) return
        getProducts(userId)
            .then((products) => setProductCount(products.length))
            .catch(() => {})
    }, [userId])

    const handleLogout = async () => {
        try {
            await logoutUser()
        } finally {
            dispatch(clearUser())
            navigate('/login')
        }
    }

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} productCount={productCount} />

            {sidebarOpen && (
                <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
            )}

            <div className={styles.main}>
                <Navbar
                    companyName={companyName ?? ''}
                    userName={userName ?? ''}
                    onMenuClick={() => setSidebarOpen(true)}
                    onLogout={handleLogout}
                />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardTemplate