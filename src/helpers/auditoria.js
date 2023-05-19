import { fetchSinToken } from "./fetch-helpers";

export const RegistraIngreso = async (data) => {
    try {
        const consultaData = await fetchSinToken('RegistraIngreso', data, "POST")
        const body = await consultaData.json()

        if (body.success == 'OK')
            return body
    }
    catch (err) {
        console.log(err)
    }
}  