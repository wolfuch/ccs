import ReCAPTCHA from 'react-google-recaptcha';

const CaptchaChallenges = ({show, handleSuccess}) => {

    if (show === false) {
        return <></>
    } 

    return (<>
        <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_V2}
            onChange={handleSuccess}
        />
    </>)
}

export default CaptchaChallenges;