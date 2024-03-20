import UserInfo from "@/interfaces/Signup";

const CheckSignupForm = (userInfo: UserInfo) => {
    const { firstName, middleName, lastName, gender, country, email, dateOfBirth, password, city, confirmPassword } = userInfo;

    // Check if all fields are filled
    if (!firstName || !lastName || !gender || !country || !email || !dateOfBirth || !password || !city || !confirmPassword) {
        return { status: 'error', message: 'Please fill in all fields.' };
    }

    // Check email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { status: 'error', message: 'Please enter a valid email address.' };
    }

    // Check password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return { status: 'error', message: 'Password must contain at least 8 characters, including 1 uppercase letter and 1 number.' };
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return { status: 'error', message: 'Password and confirm password do not match.' };
    }

    // Check if all names are even in length
    if (firstName.length % 2 !== 0 || (middleName && middleName.length % 2 !== 0) || lastName.length % 2 !== 0) {
        return { status: 'error', message: 'Names must have an even number of characters.' };
    }

    // All checks passed, return success
    return { status: 'ok' };
};

export default CheckSignupForm;
