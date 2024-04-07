import Script from 'next/script'
import style from './Calendly.module.css'
const CalendlyForm = ({ type, titleMeeting }) => {
    const username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME;
    const showDetails = process.env.NEXT_PUBLIC_CALENDLY_SHOW_DETAILS == "false" ? 1 : 0;
    const showCookies = process.env.NEXT_PUBLIC_CALENDLY_SHOW_COOKIES == "false" ? 1 : 0;

    return (
        <div className={style.mainContainer} id='meeting'>
         
             <svg className={style.waveTop} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className={style.wavePath} fill="#eefbfe" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            <h1 className={style.title}>{titleMeeting}</h1>
            <div className={style.calendlyContainer}>
                <div
                    className={`calendly-inline-widget w-screen h-screen ${style.calendly}`} data-url={`https://calendly.com/${username}${type ? `/${type}` : ''}?hide_landing_page_details=${showDetails}&hide_gdpr_banner=${showCookies}`}></div>
            </div>

            <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
        </div>
    )
}

export default CalendlyForm