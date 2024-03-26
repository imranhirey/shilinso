import fs from "fs";
export function readFile(file) {
    const currentpath = process.cwd();
    const content = fs.readFileSync(`${currentpath}/src/communications/email/templetes/${file.name}.md`, 'utf8');
    return content;
}
