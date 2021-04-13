export default class HttpClient {
    post(hostname, path, obj) {
        var opt = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        return fetch(`${hostname}${path}`, opt)
            .then(res => res.json());
    }

    get(hostname, path) {
        var opt = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return fetch(`${hostname}${path}`, opt)
            .then(res => res.json());
    }
}
