'use client'
import styles from './modalPdf.module.css'
import { useEffect, useState } from 'react';

const ModalPDF = ({ isOpenPdf, pdfLink, closePdfModal }) => {
  if (!isOpenPdf || !pdfLink) return null
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isOpenPdf && pdfLink) {
      setLoading(true);
    }
  }, [isOpenPdf, pdfLink]);

  if (!isOpenPdf || !pdfLink) return null;

  const handleIframeLoad = () => {
    setLoading(false);
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closePdfModal}>
          Cerrar
        </button>
           {loading && (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <iframe 
          src={pdfLink} 
          className={styles.iframeViewer} 
          title="Visor de PDF" 
          onLoad={handleIframeLoad}
          style={loading ? { visibility: 'hidden' } : { visibility: 'visible' }}
        />
      </div>
    </div>
  )
}

export default ModalPDF
