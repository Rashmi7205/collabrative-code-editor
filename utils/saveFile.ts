import fs from 'node:fs/promises';
export const saveFile = async ()=>{
    try {
        await fs.writeFile('./files/text.txt', 'Hello World!');
        console.log("The file has been saved!");
      } catch (err) {
        console.error(err);
      }
}