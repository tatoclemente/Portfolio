'use client'
import { useState } from 'react';
import styles from './resume.module.css'

const Resume = () => {
    const [loading, setLoading] = useState(true);
  
    const handleIframeLoad = () => {
      setLoading(false);
    };
  return (
    <div className={styles.resumeContainer}>
      {loading && (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <iframe 
          src="/cv/CV_Gustavo_Clemente_Dev_Fullstack.pdf"
          className={styles.iframeViewer} 
          title="Visor de PDF" 
          onLoad={handleIframeLoad}
          style={loading ? { visibility: 'hidden' } : { visibility: 'visible' }}
        />
    </div>
  )
}

export default Resume
