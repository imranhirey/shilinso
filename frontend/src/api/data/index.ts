import axios from "axios";

// Define the response type using an interface
interface Response {
    error: boolean;
    data: string[] | [];
    message?:string
}

// Correct the async function and return the response properly
export async function GetCountryCities(countryname: string): Promise<Response> {
    try {
        const res = await axios.get(`http://192.168.0.24:3001/get/cities/${countryname}`, {
            params: {
                authkey: "yaamaalik4321?"
            }
        });
        
        const respond: Response = {
            data: res.data.cities,
            error: false
        };

        return respond;
    } catch (error) {
        // Handle errors here if necessary
        return {
            error: true,
            data: [],
            
        };
    }
}
