// Import the fs module
import fs from 'fs';

// Define a function to create a file
const saveFile = () => {
  // File content
  const content = 'This is the content of the file.';

  // File path (relative to the project root)
  const filePath = './public/sample.txt';

  // Write the file
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return;
    }
    console.log('File created successfully.');
  });
};

// Call the function to create the file
createFile();
