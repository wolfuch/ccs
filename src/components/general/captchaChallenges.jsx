import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const CaptchaChallenges = forwardRef(({ show, handleSuccess }, ref) => {
    const recaptchaRef = useRef(null);

    useImperativeHandle(ref, () => ({
        reset: () => recaptchaRef.current?.reset(),
    }));

    if (show === false) {
        return <></>
    }

    return (<>
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_V2}
            onChange={handleSuccess}
        />
    </>)
});

CaptchaChallenges.displayName = 'CaptchaChallenges';

export default CaptchaChallenges;
