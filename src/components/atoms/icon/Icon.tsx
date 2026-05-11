/**
 *Icon class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
// icons/NotificacionesIcon.jsx
export const NotificacionesIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 2 C8 2 4 7 4 13 L4 20 L2 23 L26 23 L24 20 L24 13 C24 7 20 2 14 2 Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M11 23 Q11 26 14 26 Q17 26 17 23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// icons/PerfilIcon.jsx
export const PerfilIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="14" cy="10" r="6" stroke={color} strokeWidth="2"/>
        <path d="M3 26 C3 20 8 16 14 16 C20 16 25 20 25 26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// icons/AjustesIcon.jsx
export const AjustesIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="2"/>
        <path d="M14 2 L14 5 M14 23 L14 26 M2 14 L5 14 M23 14 L26 14 M5.8 5.8 L7.9 7.9 M20.1 20.1 L22.2 22.2 M22.2 5.8 L20.1 7.9 M7.9 20.1 L5.8 22.2"
              stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// ── Navegación sidebar ───────────────────────────────────

export const HomeIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M3 13 L14 3 L25 13" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M6 11 L6 25 L11 25 L11 18 L17 18 L17 25 L22 25 L22 11" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
);

export const PosIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2 5 L7 5 L11 19 L22 19 L26 9 L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="23" r="2" stroke={color} strokeWidth="2"/>
        <circle cx="21" cy="23" r="2" stroke={color} strokeWidth="2"/>
    </svg>
);

export const InventoryIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 9 L14 4 L24 9 L24 19 L14 24 L4 19 Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 9 L14 14 L24 9" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 14 L14 24" stroke={color} strokeWidth="2"/>
        <path d="M9 6.5 L19 11.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const SalesIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2 22 L10 13 L15 18 L26 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 6 L26 6 L26 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const FinanceIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 2 L14 26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 7 C19 7 9 7 9 12 C9 17 19 15 19 20 C19 25 9 23 9 23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const ReportsIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="4" y="17" width="5" height="8" rx="1" stroke={color} strokeWidth="2"/>
        <rect x="11" y="11" width="5" height="14" rx="1" stroke={color} strokeWidth="2"/>
        <rect x="18" y="5" width="5" height="20" rx="1" stroke={color} strokeWidth="2"/>
    </svg>
);

export const MenuIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 8 L24 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 14 L24 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 20 L24 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// ── Acciones ─────────────────────────────────────────────

export const LogoutIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M11 5 L5 5 L5 23 L11 23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 9 L23 14 L17 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 14 L10 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const SearchIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2"/>
        <path d="M18 18 L25 25" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const PlusIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 4 L14 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 14 L24 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const DeleteIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 8 L23 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 8 L10 5 L18 5 L18 8" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M7 8 L8 24 L20 24 L21 8" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M11 12 L11 20 M17 12 L17 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const EditIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 22 L8 22 L22 8 L18 4 L4 18 Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M18 4 L22 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const CloseIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 5 L23 23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M23 5 L5 23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// ── POS / Inventario ─────────────────────────────────────

export const BarcodeIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="3"  y="5" width="2" height="18" fill={color}/>
        <rect x="7"  y="5" width="1" height="18" fill={color}/>
        <rect x="10" y="5" width="3" height="18" fill={color}/>
        <rect x="15" y="5" width="1" height="18" fill={color}/>
        <rect x="18" y="5" width="2" height="18" fill={color}/>
        <rect x="22" y="5" width="3" height="18" fill={color}/>
    </svg>
);

// ── Estado / Feedback ────────────────────────────────────

export const AlertIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="2"/>
        <path d="M14 8 L14 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="20" r="1.2" fill={color}/>
    </svg>
);

export const CheckIcon = ({ size = 24, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="2"/>
        <path d="M8 14 L12 18 L20 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);