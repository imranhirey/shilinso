function generateRandomNumberString(length:number) {
    const chars = '0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars[randomIndex];
    }

    return randomString;
}




export function  Genrateuserid(){

  let userid="U"+generateRandomNumberString(6)
  return userid
}