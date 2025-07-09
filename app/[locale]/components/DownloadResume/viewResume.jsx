import style from './viewReasume.module.css'
import { FaFilePdf } from 'react-icons/fa';
import Link from 'next/link';

const ViewResume = ({ btnLabel}) => {
  
  return (
    <Link href='/resume' className={style.downloadResumeButton}>
      <FaFilePdf className={style.icon} /> {btnLabel}
    </Link>
  );
};

export default ViewResume;
