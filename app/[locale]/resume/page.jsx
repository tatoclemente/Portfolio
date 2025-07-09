import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Resume from '../components/Resume/resume';
import styles from './resume.module.css';

const ResumePage = () => {
  const t = useTranslations('NavBar'); 
  return (
    <div className={styles.mainContainer}>
      <div className={styles.resumeContainer}>
        <Link href={'/'} className={styles.backButton}>
          { t('BackToPorfolio') }
        </Link>
        <Resume />
      </div>
    </div>
  )
}

export default ResumePage
