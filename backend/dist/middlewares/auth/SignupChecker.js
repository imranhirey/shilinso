class UserController {
    usertype;
    constructor(usertype) {
        this.usertype = usertype;
    }
    savenewuser() {
        return this.usertype === "personal" ? this.personalaccount() : this.businessaccount();
    }
    log(message, ...args) {
        if (process.env.NODE_ENV === 'development') {
            console.log(message, ...args);
        }
    }
    personalaccount() {
        this.log("Creating personal account");
    }
    businessaccount() {
        this.log("Creating business account");
    }
}
export default UserController;
