class UserController {
    usertype;
    constructor(usertype) {
        this.usertype = usertype;
    }
    //@ts-ignore
    @logIfDevelopment
    savenewuser() {
        return this.usertype === "personal" ? this.personalaccount() : this.businessaccount();
    }
    //@ts-ignore
    @logIfDevelopment
    personalaccount() {
        console.log("Creating personal account");
    }
    //@ts-ignore
    @logIfDevelopment
    businessaccount() {
        console.log("Creating business account");
    }
}
// Example usage
export default UserController;
