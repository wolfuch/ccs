const apiBaseUrl = window.REACT_APP_API_URL;
const apiVersion = window.REACT_APP_API_VERSION;

// Metodo para hacer consultas a la api sin token 
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ apiBaseUrl }/${ apiVersion }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data, token, method = 'GET' ) => {

    const url = `${ apiBaseUrl }/${ apiVersion }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}