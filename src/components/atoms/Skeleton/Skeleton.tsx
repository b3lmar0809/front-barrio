/**
 * Skeleton class
 * @Version: 1.0.0 - 18 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 18 jun. 2026
 */
import React from 'react'
import styles from './Skeleton.module.css'

interface SkeletonProps {
    width?: string | number
    height?: string | number
    circle?: boolean
    className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, circle = false, className }) => {
    const style: React.CSSProperties = {
        width:  typeof width  === 'number' ? `${width}px`  : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '50%' : undefined,
    }
    return <div className={`${styles.skeleton}${className ? ` ${className}` : ''}`} style={style} />
}

export default Skeleton
