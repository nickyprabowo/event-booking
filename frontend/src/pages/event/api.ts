export const fetchEvents = () => {
    return new Promise((resolve, reject) => {
        const request = {
            query: `
                query {
                    events {
                        id
                        title
                        description
                        price
                        date,
                        creator {
                            id
                        }
                    }
                }
            `
        }
    
        return fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(({ data: result }) => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        })
    })
}