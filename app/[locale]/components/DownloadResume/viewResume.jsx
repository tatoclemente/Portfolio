import style from './viewReasume.module.css'
import { FaFilePdf } from 'react-icons/fa';

const ViewResume = ({ btnLabel, openViewResume}) => {
  
  return (
    <button onClick={openViewResume} className={style.downloadResumeButton}>
      <FaFilePdf className={style.icon} /> {btnLabel}
    </button>
  );
};

export default ViewResume;
