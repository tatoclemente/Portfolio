import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Resume from '../components/Resume/resume';
import styles from './resume.module.css';
import { BiArrowBack } from 'react-icons/bi';

const ResumePage = () => {
  const t = useTranslations('NavBar'); 
  return (
    <div className={styles.mainContainer}>
      <div className={styles.resumeContainer}>
        <Link href={'/'} className={styles.backButton}>
          <BiArrowBack /> { t('BackToPorfolio') }
        </Link>
        <Resume />
      </div>
    </div>
  )
}

export default ResumePage
