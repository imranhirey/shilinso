import bcrypt from "bcrypt";
const saltRounds = 10; // The cost factor for hashing

export const hashPassword = async (plainTextPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
};

export const comparePasswords = async (userEnteredPassword: string, hashFromDatabase: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(userEnteredPassword, hashFromDatabase);
        return result;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false; // Return false in case of error
    }
};


export function validatePassword(password: string): string[] {
    const errors: string[] = [];
    const minLength = 8;
    const maxLength = 100;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;
    const noSpaceRegex = /^\S*$/;

    // Check minimum length
    if (password.length < minLength) {
        errors.push("Password must be at least 8 characters long");
    }

    // Check maximum length
    if (password.length > maxLength) {
        errors.push("Password cannot exceed 100 characters");
    }

    // Check for at least one uppercase letter
    if (!uppercaseRegex.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    // Check for at least one lowercase letter
    if (!lowercaseRegex.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    // Check for at least one digit
    if (!digitRegex.test(password)) {
        errors.push("Password must contain at least one digit");
    }

    // Check for at least one symbol
    if (!symbolRegex.test(password)) {
        errors.push("Password must contain at least one symbol");
    }

    // Check for no spaces
    if (!noSpaceRegex.test(password)) {
        errors.push("Password cannot contain spaces");
    }

    return errors;
}
