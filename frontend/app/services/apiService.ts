import { getAccessToken } from "../lib/actions";

const ApiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);
        const token = await getAccessToken();
        
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
                resolve(json);

            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    post: async function (url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
                resolve(json);

            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    post_auth: async function (url: string, data: any): Promise<any> {

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
                resolve(json);
            })
            .catch((error) => {
                console.error('API POST Auth Error:', error);
                reject(error);
            });
        });
    },
    post_auth_form: async function (url: string, data: FormData): Promise<any> {
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
                resolve(json);
            })
            .catch((error) => {
                console.error('API POST Auth Error:', error);
                reject(error);
            });
        });
    },
    put: async function (url: string, data: any): Promise<any> {

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);
                resolve(json);
            })
            .catch((error) => {
                console.error('API PUT Error:', error);
                reject(error);
            });
        });
    },
    put_form: async function (url: string, data: any): Promise<any> {
        const token = await getAccessToken();
    
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(async response => {
                const json = await response.json();
                resolve({ status: response.status, data: json });
            })
            .catch((error) => {
                console.error('API PUT Error:', error);
                reject(error);
            });
        });
    },
    delete: async function (url: string): Promise<any> {

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                if (response.status === 204) {
                    return resolve(null); 
                }
                return response.json();
            })
            .then((json) => {
                if (json !== null) { 
                    console.log('json', json);
                    resolve(json);
                } else {
                    resolve(null); 
                }
            })
            .catch((error) => {
                console.error('API DELETE Error:', error);
                reject(error);
            });
        });
    },
}

export default ApiService;
