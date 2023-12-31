import Script from 'next/script'
import style from './Calendly.module.css'
const CalendlyForm = ({ type, titleMeeting }) => {
    const username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME;
    const showDetails = process.env.NEXT_PUBLIC_CALENDLY_SHOW_DETAILS == "false" ? 1 : 0;
    const showCookies = process.env.NEXT_PUBLIC_CALENDLY_SHOW_COOKIES == "false" ? 1 : 0;

    return (
        <div className={style.mainContainer} id='meeting'>
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