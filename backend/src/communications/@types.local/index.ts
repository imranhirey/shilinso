
type filename= "verifications" | "welcome"
export interface Emailtemplet{
    name:filename

}

export interface EmailVerificationDynamicContext{
    link:string,
    name:string,
    additionsal_text?:string
}

