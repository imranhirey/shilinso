import bcrypt from "bcrypt";
const saltRounds = 10; // The cost factor for hashing
export const hashPassword = async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
};
export const comparePasswords = async (userEnteredPassword, hashFromDatabase) => {
    try {
        const result = await bcrypt.compare(userEnteredPassword, hashFromDatabase);
        return result;
    }
    catch (error) {
        console.error("Error comparing passwords:", error);
        return false; // Return false in case of error
    }
};
