/**
 * AuthTemplate class
 * @Version: 1.0.0 - 0 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 04 may. 2026
 */
import React from 'react'
import BenefitItem from '../../atoms/BenefitItem/BenefitItem'
import { PosIcon, InventoryIcon, ReportsIcon } from '../../atoms/icon/Icon'
import styles from './AuthTemplate.module.css'

interface BenefitConfig {
    icon: React.ReactNode
    text: string
}

interface AuthTemplateProps {
    children: React.ReactNode
    title?: string
    variant?: 'default' | 'split'
    slogan?: string
    benefits?: BenefitConfig[]
}

const defaultSlogan = 'Gestiona tu almacén de barrio desde un solo lugar.'

const defaultBenefits: BenefitConfig[] = [
    { icon: <PosIcon size={18} color="#9FE1CB" />, text: 'Punto de venta rápido' },
    { icon: <InventoryIcon size={18} color="#9FE1CB" />, text: 'Control de inventario' },
    { icon: <ReportsIcon size={18} color="#9FE1CB" />, text: 'Reportes y finanzas' },
]

const AuthTemplate: React.FC<AuthTemplateProps> = ({
    children,
    title,
    variant = 'default',
    slogan,
    benefits,
}) => {
    if (variant === 'split') {
        const resolvedSlogan = slogan ?? defaultSlogan
        const resolvedBenefits = benefits ?? defaultBenefits
        return (
            <div className={styles.splitPage}>
                <div className={styles.splitWrapper}>
                    <div className={styles.leftPanel}>
                        <p className={styles.splitLogo}>
                            Barrio<span>App</span>
                        </p>
                        <p className={styles.slogan}>
                            {resolvedSlogan}
                        </p>
                        <div className={styles.benefits}>
                            {resolvedBenefits.map((b, i) => (
                                <BenefitItem key={i} icon={b.icon} text={b.text} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.rightPanel}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <p className={styles.logo}>
                        Barrio<span>App</span>
                    </p>
                    {title && <h1 className={styles.title}>{title}</h1>}
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthTemplate
