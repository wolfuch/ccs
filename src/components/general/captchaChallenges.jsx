import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const CaptchaChallenges = forwardRef(({ show, handleSuccess }, ref) => {
    const recaptchaRef = useRef(null);

    useImperativeHandle(ref, () => ({
        reset: () => recaptchaRef.current?.reset(),
    }));

    // No desmontamos el widget al ocultarlo: montarlo/desmontarlo en la misma
    // página que el provider de v3 provoca un race en grecaptcha.render y el
    // checkbox a veces no aparece. Lo mantenemos montado y solo lo ocultamos.
    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_V2}
                onChange={handleSuccess}
            />
        </div>
    );
});

CaptchaChallenges.displayName = 'CaptchaChallenges';

export default CaptchaChallenges;
