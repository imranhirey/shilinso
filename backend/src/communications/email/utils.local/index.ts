import { Emailtemplet } from "../../@types.local/index.js";
import fs from "fs"

export function readFile (file:Emailtemplet){
    const currentpath= process.cwd()
    const content = fs.readFileSync(`${currentpath}/src/communications/email/templetes/${file.name}.md`, 'utf8');
 return content
    

}