/**
 * ProductRowSkeleton
 * @Version: 1.0.0 - 26 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 26 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './ProductRowSkeleton.module.css'

const ProductRowSkeleton: React.FC = () => (
    <div className={styles.row}>
        {/* Nombre */}
        <Skeleton width={140} height={14} />
        {/* Categoría */}
        <Skeleton width={100} height={14} />
        {/* Cód. barras */}
        <Skeleton width={90}  height={14} />
        {/* Precio venta */}
        <div className={styles.right}><Skeleton width={50} height={14} /></div>
        {/* Costo unit. */}
        <div className={styles.right}><Skeleton width={50} height={14} /></div>
        {/* Ganancia */}
        <div className={styles.right}><Skeleton width={50} height={14} /></div>
        {/* Stock badge */}
        <div className={styles.center}><Skeleton width={52} height={22} className={styles.pill} /></div>
        {/* Stock mín. */}
        <div className={styles.right}><Skeleton width={30} height={14} /></div>
        {/* Acciones */}
        <div className={styles.center}><Skeleton width={28} height={28} /></div>
    </div>
)

export default ProductRowSkeleton
