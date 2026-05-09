/**
 * useBarcodeScanner hook
 *
 * @version 1.0.0 - 07 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 07 may. 2026
 *
 **/
import { useState, useCallback, useRef } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { NotFoundException } from '@zxing/library'

interface UseBarcodeScannerOptions {
    onScan: (barcode: string) => void
}

interface UseBarcodeScannerReturn {
    isScanning: boolean
    startScanning: (videoRef: React.RefObject<HTMLVideoElement | null>) => void
    stopScanning: () => void
}

export const useBarcodeScanner = ({ onScan }: UseBarcodeScannerOptions): UseBarcodeScannerReturn => {
    // true mientras la cámara está activa y leyendo
    const [isScanning, setIsScanning] = useState(false)

    // guarda el objeto de control que devuelve zxing para poder detener el stream después
    const controlsRef = useRef<{ stop: () => void } | null>(null)

    const startScanning = useCallback(async (videoRef: React.RefObject<HTMLVideoElement | null>) => {
        // evita iniciar si el elemento video no existe o ya hay un scan en curso
        if (!videoRef.current || isScanning) return

        // BrowserMultiFormatReader intenta decodificar varios formatos (EAN, QR, Code128, etc.)
        const reader = new BrowserMultiFormatReader()

        try {
            // decodeFromVideoDevice arranca la camara y ejecuta el callback en cada frame
            // undefined como primer arg hace que zxing elija la camara trasera por defecto
            const controls = await reader.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                (result, error) => {
                    if (result) {
                        // se leyo un codigo exitosamente → se lo pasa al componente padre
                        onScan(result.getText())
                    }
                    if (error && !(error instanceof NotFoundException)) {
                        // NotFoundException ocurre en cada frame sin codigo, es normal y se ignora
                        // cualquier otro error sí se loguea
                        console.error('Scanner error:', error)
                    }
                }
            )
            // guardamos los controles para poder llamar a stop() despues
            controlsRef.current = controls
            setIsScanning(true)
        } catch (err) {
            // el usuario rechazo el permiso de camara o el dispositivo no tiene camara
            console.error('No se pudo iniciar la camara:', err)
            setIsScanning(false)
        }
    }, [isScanning, onScan])

    const stopScanning = useCallback(() => {
        if (controlsRef.current) {
            // detiene el stream de video y libera la camara
            controlsRef.current.stop()
            controlsRef.current = null
        }
        setIsScanning(false)
    }, [])

    return { isScanning, startScanning, stopScanning }
}
