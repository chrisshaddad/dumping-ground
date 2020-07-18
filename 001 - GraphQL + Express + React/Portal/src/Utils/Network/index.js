import Constants from "../Constants";
import testingData from "./testingData"

const apiLinks = Constants.apiLinks;

class API {
  //Centrilised network calls in case we need to do some global handling of messages received from the server
  post(url, body = {}) {
    const fullUrl = `${Constants.apiLinks.GRAPHQL_SERVER_LINK}${url}`;

    return fetch(fullUrl, {
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  login(username, password) {
    //Should hash password in a production environement

    return this.post("/users/login", {
      username,
      password,
    });
  }

  getNotifications(){
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               return resolve(testingData.getNotificationsResult);
           }, 3000);
        })
  }
}

export default new API();
