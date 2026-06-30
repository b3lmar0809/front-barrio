/**
 *PosPage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useCart } from '../../hooks/useCart'
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner'
import { searchByText, searchByCode } from '../../api/ProductApi'
import type { Product } from '../../api/ProductApi'
import { createSale } from '../../api/SaleApi'
import { useAppSelector } from '../../app/hooks'
import { formatCLP, formatInputCLP, parseCLP } from '../../utils/formatters'
import SearchBar from '../../components/molecules/SearchBar/SearchBar'
import CartList from '../../components/organisms/CartList/CartList'
import Spinner from '../../components/atoms/Spinner/Spinner'
import styles from './PosPage.module.css'

type PaymentMethod = 'CASH' | 'CARD'
type MobilePanel   = 'search' | 'cart'

const PosPage: React.FC = () => {
    //usuario autenticado (para llamadas API)
    const userId      = useAppSelector((s) => s.user.id)
    const declaresIva = useAppSelector((s) => s.user.declaresIva)

    //estado del carrito (hook centralizado)
    const { cart, addItem, removeItem, updateQuantity, clearCart, total } = useCart()

    //controla si el panel de cámara está abierto
    const [cameraOpen, setCameraOpen] = useState(false)

    // ── Panel activo en móvil: búsqueda o carrito ─────────────────────────────
    const [mobilePanel, setMobilePanel] = useState<MobilePanel>('search')

    //buesqueda por texto
    const [query,       setQuery]       = useState('')
    const [results,     setResults]     = useState<Product[]>([])
    const [searching,   setSearching]   = useState(false)
    const [searchError, setSearchError] = useState<string | null>(null)

    //llamada a searchByText cuando el usuario confirma la busqueda
    const handleTextSearch = async () => {
        if (!userId || !query.trim()) return
        setSearching(true)
        setSearchError(null)
        try {
            const res = await searchByText(userId, query.trim())
            setResults(res.product)
            if (res.product.length === 0) setSearchError('Sin resultados para tu busqueda')
        } catch {
            setSearchError('Error al buscar productos.')
        } finally {
            setSearching(false)
        }
    }

    //mapea un Product del API al formato CartItem y lo agrega al carrito
    const addProductToCart = useCallback((product: Product) => {
        addItem({
            productId: product.id,
            name:      product.name,
            barcode:   product.barcode,
            unitPrice: product.salePrice,
        })
        //limpia los resultados despues de agregar
        setResults([])
        setQuery('')
    }, [addItem])


    // busquede de codigo con la pistola
    const [barcodeError, setBarcodeError] = useState<string | null>(null)

    //eecibe el codigo, busca en el API y agrega al carrito si encuentra
    const handleBarcodeScan = useCallback(async (barcode: string) => {
        setBarcodeError(null)
        try {
            const res = await searchByCode(barcode)
            if (res.product.length > 0) {
                addProductToCart(res.product[0])
            } else {
                setBarcodeError(`Producto no encontrado: ${barcode}`)
            }
        } catch {
            setBarcodeError('Error al buscar el producto.')
        }
    }, [addProductToCart])


    //camara (useBarcodeScanner)
    const videoRef = useRef<HTMLVideoElement>(null)
    const { isScanning, startScanning, stopScanning } = useBarcodeScanner({ onScan: handleBarcodeScan })

    //inicia la camara al abrir el panel y la detiene al cerrarlo
    useEffect(() => {
        if (cameraOpen) {
            startScanning(videoRef)
        } else {
            stopScanning()
        }
        return () => stopScanning()
    }, [cameraOpen]) // eslint-disable-line react-hooks/exhaustive-deps

    // PISTOLA SCANNER USB — el lector escribe en el input unificado y envía Enter
    const handleScannerEnter = () => {
        if (!query.trim()) return
        const code = query.trim()
        setQuery('')
        handleBarcodeScan(code)
    }

    //pago
    const [paymentMethod,  setPaymentMethod]  = useState<PaymentMethod>('CASH')
    const [amountReceived, setAmountReceived] = useState('')

    //vuelto y desglose de IVA (solo display, no modifica el total)
    const receivedNum = parseInt(parseCLP(amountReceived) || '0', 10)
    const change      = receivedNum - total
    const iva         = Math.round(total * 19 / 119)

    //confirma la venta
    const [confirming,   setConfirming]   = useState(false)
    const [saleSuccess,  setSaleSuccess]  = useState<string | null>(null)
    const [saleError,    setSaleError]    = useState<string | null>(null)

    const handleConfirmSale = async () => {
        if (!userId || cart.length === 0) return
        setConfirming(true)
        setSaleSuccess(null)
        setSaleError(null)
        const payload = {
                userId,
                items: cart.map((item) => ({
                    productId: item.productId,
                    quantity:  item.quantity,
                    barcode:   item.barcode,
                })),
                paymentMethod,
                amountReceived: paymentMethod === 'CARD' ? total : receivedNum,
            }
        try {
            await createSale(payload)
            const msg = paymentMethod === 'CASH'
                ? `Venta registrada. Vuelto: ${formatCLP(change >= 0 ? change : 0)}`
                : 'Venta registrada exitosamente.'
            setSaleSuccess(msg)
            clearCart()
            setAmountReceived('')
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } }
            const msg = axiosErr?.response?.data?.message
            setSaleError(msg ?? 'Error al registrar la venta. Intenta de nuevo.')
            console.error('[createSale]', axiosErr?.response?.data)
        } finally {
            setConfirming(false)
        }
    }

    //render
    return (
        <div className={styles.page}>

            {/* barra de navegación solo visible en móvil */}
            <div className={styles.mobileTabs}>
                {(['search', 'cart'] as MobilePanel[]).map((panel) => (
                    <button
                        key={panel}
                        className={`${styles.mobileTab} ${mobilePanel === panel ? styles.mobileTabActive : ''}`}
                        onClick={() => setMobilePanel(panel)}
                    >
                        {panel === 'search' ? 'Busqueda' : `Carrito (${cart.length})`}
                    </button>
                ))}
            </div>

            {/* columna izquierda, búsqueda y entrada de producto */}
            <div className={`${styles.left} ${mobilePanel !== 'search' ? styles.panelHidden : ''}`}>
                <h2 className={styles.sectionTitle}>Punto de Venta</h2>

                {/* barra unificada: texto + pistola USB + cámara */}
                <SearchBar
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={handleTextSearch}
                    onScannerEnter={handleScannerEnter}
                    onCameraToggle={() => setCameraOpen((o) => !o)}
                    cameraOpen={cameraOpen}
                    placeholder="Buscar producto por nombre o escanear código..."
                />

                {/* panel de cámara — aparece inline debajo de la barra */}
                {cameraOpen && (
                    <div className={styles.cameraPanel}>
                        <video
                            ref={videoRef}
                            className={styles.video}
                            autoPlay
                            playsInline
                            muted
                        />
                        {!isScanning && <p className={styles.hint}>Iniciando cámara...</p>}
                        {barcodeError && <p className={styles.error}>{barcodeError}</p>}
                    </div>
                )}

                {searching && <div className={styles.center}><Spinner size="sm" /></div>}
                {searchError && <p className={styles.error}>{searchError}</p>}
                {!cameraOpen && barcodeError && <p className={styles.error}>{barcodeError}</p>}

                {/* lista de resultados — clic agrega al carrito */}
                {results.length > 0 && (
                    <ul className={styles.resultList}>
                        {results.map((p) => (
                            <li
                                key={p.id}
                                className={styles.resultItem}
                                onClick={() => addProductToCart(p)}
                            >
                                <span className={styles.resultName}>{p.name}</span>
                                <span className={styles.resultCode}>{p.barcode}</span>
                                <span className={styles.resultPrice}>{formatCLP(p.salePrice)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* columna derecha — carrito y pago */}
            <div className={`${styles.right} ${mobilePanel !== 'cart' ? styles.panelHidden : ''}`}>
                <h2 className={styles.sectionTitle}>Carrito</h2>

                {/* Lista de productos */}
                <CartList
                    items={cart}
                    onRemove={removeItem}
                    onQuantityChange={updateQuantity}
                />

                {/* Panel de pago */}
                <div className={styles.payment}>

                    {/* Segmented control EFECTIVO / TARJETA */}
                    <div className={styles.paymentMethods}>
                        {(['CASH', 'CARD'] as PaymentMethod[]).map((method) => (
                            <button
                                key={method}
                                type="button"
                                className={`${styles.methodBtn} ${paymentMethod === method ? styles.methodActive : ''}`}
                                onClick={() => setPaymentMethod(method)}
                            >
                                {method === 'CASH' ? 'Efectivo' : 'Tarjeta'}
                            </button>
                        ))}
                    </div>

                    {/* Monto recibido — solo EFECTIVO */}
                    {paymentMethod === 'CASH' && (
                        <div className={styles.cashSection}>
                            <label className={styles.cashLabel} htmlFor="cashReceived">
                                Monto recibido
                            </label>
                            <div className={styles.cashInputWrapper}>
                                <span className={styles.cashPrefix}>$</span>
                                <input
                                    id="cashReceived"
                                    className={styles.cashInput}
                                    type="text"
                                    inputMode="numeric"
                                    value={amountReceived}
                                    onChange={(e) => setAmountReceived(formatInputCLP(e.target.value))}
                                    placeholder="0"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    )}

                    {/* Desglose: subtotal / IVA / total */}
                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Subtotal</span>
                            <span className={styles.summaryValue}>{formatCLP(total)}</span>
                        </div>
                        {declaresIva && (
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>IVA (19%)</span>
                                <span className={styles.summaryValue}>{formatCLP(iva)}</span>
                            </div>
                        )}
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span className={styles.totalLabel}>Total</span>
                            <span className={styles.totalValue}>{formatCLP(total)}</span>
                        </div>
                    </div>

                    {/* Vuelto */}
                    {paymentMethod === 'CASH' && amountReceived !== '' && receivedNum >= total && total > 0 && (
                        <div className={styles.changeBox}>
                            <span className={styles.changeLabel}>Vuelto</span>
                            <span className={styles.changeValue}>{formatCLP(change)}</span>
                        </div>
                    )}
                    {paymentMethod === 'CASH' && amountReceived !== '' && receivedNum < total && (
                        <p className={styles.shortfall}>
                            Faltan {formatCLP(total - receivedNum)} para completar el pago
                        </p>
                    )}

                    {/* Mensajes de resultado */}
                    {saleSuccess && <p className={styles.success}>{saleSuccess}</p>}
                    {saleError   && <p className={styles.error}>{saleError}</p>}

                    {/* Confirmar venta */}
                    <button
                        type="button"
                        className={styles.confirmBtn}
                        onClick={handleConfirmSale}
                        disabled={
                            confirming ||
                            cart.length === 0 ||
                            (paymentMethod === 'CASH' && receivedNum < total)
                        }
                    >
                        {confirming ? <span className={styles.confirmSpinner} /> : 'Confirmar venta'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PosPage
