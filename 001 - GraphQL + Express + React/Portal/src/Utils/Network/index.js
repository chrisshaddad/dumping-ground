import Constants from "../Constants"

const apiLinks = Constants.apiLinks;

class API {
    //Centrilised network calls in case we need to do some global handling of messages received from the server
    post(url, body = {}) {
        return fetch(url, {
            method: "post",
            credentials: "same-origin",
            body
        })
        .then(response => response.json())
        
    }
}

export default new API();