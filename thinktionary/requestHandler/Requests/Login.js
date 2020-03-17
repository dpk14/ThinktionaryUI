import Request from "../Request";

class Login extends Request{
    constructor(user, pwd) {
        let url = BASE_URL + "/users/login?user=" + user + "&pwd=" + pwd
        super();
    }

}
export async function login(user, pwd) {
    let url = BASE_URL + "/users/login?user=" + user + "&pwd=" + pwd
    return request(url, GET, null, true);
