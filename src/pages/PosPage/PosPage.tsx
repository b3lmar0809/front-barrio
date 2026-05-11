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
import { formatCLP } from '../../utils/formatters'
import SearchBar from '../../components/molecules/SearchBar/SearchBar'
import CartList from '../../components/organisms/CartList/CartList'
import Spinner from '../../components/atoms/Spinner/Spinner'
import Button from '../../components/atoms/Button/Button'
import styles from './PosPage.module.css'

type Tab           = 'text' | 'camera' | 'scanner'
type PaymentMethod = 'CASH' | 'CARD'
type MobilePanel   = 'search' | 'cart'

const PosPage: React.FC = () => {
    //usuario autenticado (para llamadas API)
    const userId = useAppSelector((s) => s.user.id)

    //estado del carrito (hook centralizado)
    const { cart, addItem, removeItem, updateQuantity, clearCart, total } = useCart()

    //activo: texto / camara / pistola
    const [activeTab, setActiveTab] = useState<Tab>('text')

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

    //inicia la camara al entrar al tab y la detiene al salir
    useEffect(() => {
        if (activeTab === 'camera') {
            startScanning(videoRef)
        } else {
            stopScanning()
        }
        // Cleanup: libera la cámara si el componente se desmonta
        return () => stopScanning()
    }, [activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

    // PISTOLA SCANNER USB
    //La pistola funciona como teclado: escribe el codigo y envía Enter
    const [scannerCode, setScannerCode] = useState('')
    const scannerInputRef = useRef<HTMLInputElement>(null)

    //enfoca el input oculto automaticamente al activar el tab
    useEffect(() => {
        if (activeTab === 'scanner') scannerInputRef.current?.focus()
    }, [activeTab])

    //al presionar Enter con un codigo, dispara la búsqueda
    const handleScannerKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && scannerCode.trim()) {
            handleBarcodeScan(scannerCode.trim())
            setScannerCode('')
        }
    }

    //pago
    const [paymentMethod,  setPaymentMethod]  = useState<PaymentMethod>('CASH')
    const [amountReceived, setAmountReceived] = useState('')

    //vuelto calculado en tiempo real (solo para efectivo)
    const change = parseFloat(amountReceived || '0') - total

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
                amountReceived: paymentMethod === 'CARD'
                    ? total
                    : parseFloat(amountReceived || '0'),
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

            {/* columna izquierda, buaqueda y entrada de producto */}
            <div className={`${styles.left} ${mobilePanel !== 'search' ? styles.panelHidden : ''}`}>
                <h2 className={styles.sectionTitle}>Punto de Venta</h2>

                {/* selecciona el metodo de entrada */}
                <div className={styles.tabs}>
                    {(['text', 'camera', 'scanner'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'text'    && 'Buscar'}
                            {tab === 'camera'  && 'Camara'}
                            {tab === 'scanner' && 'Scanner'}
                        </button>
                    ))}
                </div>

                {/*busqueda por texto  */}
                {activeTab === 'text' && (
                    <div className={styles.tabContent}>
                        <SearchBar
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onSearch={handleTextSearch}
                            placeholder="Buscar producto por nombre..."
                        />
                        {searching && <div className={styles.center}><Spinner size="sm" /></div>}
                        {searchError && <p className={styles.error}>{searchError}</p>}

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
                )}

                {/*tab 2: Ca mara (useBarcodeScanner) */}
                {activeTab === 'camera' && (
                    <div className={styles.tabContent}>
                        {/*el elemento video que recibe el stream de la camara */}
                        <video
                            ref={videoRef}
                            className={styles.video}
                            autoPlay
                            playsInline
                            muted
                        />
                        {!isScanning && <p className={styles.hint}>Iniciando camara...</p>}
                        {barcodeError && <p className={styles.error}>{barcodeError}</p>}
                    </div>
                )}

                {/*pistolo scanner*/}
                {activeTab === 'scanner' && (
                    <div className={styles.tabContent}>
                        <p className={styles.hint}>
                            Apunta la pistola al codigo de barras, codigo se captura automaticamente al escanear.
                        </p>
                        {/*input que recibe los caracteres de la pistola y dispara en Enter */}
                        <input
                            ref={scannerInputRef}
                            className={styles.scannerInput}
                            value={scannerCode}
                            onChange={(e) => setScannerCode(e.target.value)}
                            onKeyDown={handleScannerKey}
                            placeholder="Esperando codigo..."
                            autoFocus
                        />
                        {barcodeError && <p className={styles.error}>{barcodeError}</p>}
                    </div>
                )}
            </div>

            {/* columna derecha pago */}
            <div className={`${styles.right} ${mobilePanel !== 'cart' ? styles.panelHidden : ''}`}>
                <h2 className={styles.sectionTitle}>Carrito</h2>

                {/* Lista de items con total incluido */}
                <CartList
                    items={cart}
                    onRemove={removeItem}
                    onQuantityChange={updateQuantity}
                    total={total}
                />

                {/*seccion de pago */}
                <div className={styles.payment}>

                    {/* selector EFECTIVO / TARJETA */}
                    <div className={styles.paymentMethods}>
                        {(['CASH', 'CARD'] as PaymentMethod[]).map((method) => (
                            <button
                                key={method}
                                className={`${styles.methodBtn} ${paymentMethod === method ? styles.methodActive : ''}`}
                                onClick={() => setPaymentMethod(method)}
                            >
                                {method === 'CASH' ? 'Efectivo' : 'Tarjeta'}
                            </button>
                        ))}
                    </div>

                    {/* monto recibido y vuelto — solo visible en efectivo */}
                    {paymentMethod === 'CASH' && (
                        <div className={styles.cashSection}>
                            <label className={styles.cashLabel}>Monto recibido</label>
                            <input
                                className={styles.cashInput}
                                type="number"
                                min={0}
                                value={amountReceived}
                                onChange={(e) => setAmountReceived(e.target.value)}
                                placeholder="$0"
                            />
                            {/* vuelto en tiempo real — rojo si el monto es insuficiente */}
                            {parseFloat(amountReceived || '0') > 0 && (
                                <div className={`${styles.change} ${change < 0 ? styles.changeNegative : ''}`}>
                                    <span>Vuelto</span>
                                    <span>{formatCLP(change >= 0 ? change : 0)}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* mensaje de resultado de la venta */}
                    {saleSuccess && <p className={styles.success}>{saleSuccess}</p>}
                    {saleError   && <p className={styles.error}>{saleError}</p>}

                    {/* confirmar venta, deshabilitado si el carrito está vacio */}
                    <Button
                        label="Confirmar venta"
                        variant="primary"
                        isLoading={confirming}
                        disabled={cart.length === 0 || confirming}
                        onClick={handleConfirmSale}
                    />
                </div>
            </div>
        </div>
    )
}

export default PosPage
