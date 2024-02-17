import axios from 'axios';
interface Code{
    language:string;
    stdin:string|null;
    name:string ;
    content:string 
}

export const compileCode = async ({ language, stdin, name, content }) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': "5924c0ed3amshf8cbf64ea98c7f6p193133jsne2c1829adf3e",
        'X-RapidAPI-Host': "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: language,
        stdin: stdin,
        files: [
          {
            name: name,
            content: content,
          },
        ],
      },
    };

    const { data } = await axios(options);
   
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
