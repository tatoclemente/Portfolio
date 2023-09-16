import Link from 'next/link';
import style from './DownloadReasume.module.css'
import { FaFilePdf } from 'react-icons/fa';

const DownloadResume = ({downloadResume}) => {

  return (
    <Link className={style.downloadResumeButton} href='./cv/Resume_GustavoClemente_Dev_Fullstack.pdf' target='_blank' download>
      {downloadResume} <FaFilePdf className={style.icon} />
    </Link>
  );
};

export default DownloadResume;
