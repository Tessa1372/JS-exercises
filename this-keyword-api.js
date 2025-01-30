class Details {
    constructor(api) {
        this._api = api;
    }

    get api() {
        return this._api;
    }

    async getData() {
        try {
            const response = await fetch(this._api);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}


const apiUrl = 'https://run.mocky.io/v3/fc8d87b3-ca1d-4447-9daa-13e9b7cbccec';
const detailsInstance = new Details(apiUrl);

detailsInstance.getData().then(data => console.log(data)).catch(err => console.error(err));


