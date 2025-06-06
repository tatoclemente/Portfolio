import styles from './modalPdf.module.css'

const ModalPDF = ({ isOpenPdf, pdfLink, closePdfModal }) => {
  if (!isOpenPdf || !pdfLink) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closePdfModal}>
          Cerrar
        </button>
        <iframe 
          src={pdfLink} 
          className={styles.iframeViewer} 
          title="Visor de PDF" 
        />
      </div>
    </div>
  )
}

export default ModalPDF
