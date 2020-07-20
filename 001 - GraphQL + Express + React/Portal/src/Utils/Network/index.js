import Constants from "../Constants";
import testingData from "./testingData";

class API {
  //Centrilised network calls in case we need to do some global handling of messages received from the server
  post(url, body = {}) {
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  get(url, params = {}) {
    const urlObj = new URL(url);
    urlObj.search = new URLSearchParams(params).toString();

    return fetch(urlObj, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  login(username, password) {
    //Should hash password in a production environement
    //Inhouse server request
    const fullUrl = `${Constants.apiLinks.GRAPHQL_SERVER_LINK}/users/login`;

    return this.post(fullUrl, {
      username,
      password,
    });
  }

  getNotifications() {
    //Mock Request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(testingData.getNotificationsResult);
      }, 3000);
    });
  }

  getEmployees(pageNumber, pageSize) {
    //Third party API request
    const url = Constants.apiLinks.RANDOM_USER_LINK;

    const params = {
      page: pageNumber,
      results: pageSize,
      seed: "CHALLENGE",
      inc: "name,location,phone,picture,email,id,login",
      nat: "us,fr,ca",
    };

    return this.get(url, params);
  }

  addEmployee(employeeToAdd) {
    const fullUrl = `${Constants.apiLinks.GRAPHQL_SERVER_LINK}/employees/add`;
    return this.post(fullUrl, employeeToAdd);
  }

  updateEmployee(employeeToUpdate) {
    const fullUrl = `${Constants.apiLinks.GRAPHQL_SERVER_LINK}/employees/update`;
    return this.post(fullUrl, employeeToUpdate);
  }

  deleteEmployee(id) {
    const fullUrl = `${Constants.apiLinks.GRAPHQL_SERVER_LINK}/employees/delete`;
    return this.post(fullUrl, {
      id,
    });
  }
}

export default new API();
