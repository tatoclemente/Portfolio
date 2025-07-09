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
          src="/cv/Resume_Gustavo_Clemente_Dev_Frontend.pdf"
          className={styles.iframeViewer} 
          title="Visor de PDF" 
          onLoad={handleIframeLoad}
          style={loading ? { visibility: 'hidden' } : { visibility: 'visible' }}
        />
    </div>
  )
}

export default Resume
