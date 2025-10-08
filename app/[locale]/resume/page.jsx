import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Resume from '../components/Resume/resume';
import styles from './resume-page.module.css';
import { BiArrowBack, BiDownload } from 'react-icons/bi';

const ResumePage = () => {
  const t = useTranslations('NavBar'); 
  return (
    <div className={styles.mainContainer}>
      <div className={styles.resumeContainer}>
        <div className={styles.actionsContainer}>
          <Link href={'/'} className={styles.backButton}>
            <BiArrowBack /> { t('BackToPorfolio') }
          </Link>
          <a className={styles.downloadButton} href="/cv/CV_Gustavo_Clemente_Dev_Fullstack.pdf" download>
            <BiDownload /> { t('DownloadResume') }
          </a>
        </div>
        <Resume />
      </div>
    </div>
  )
}

export default ResumePage
