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
      url: process.env.NEXT_PUBLIC_RAPID_API_URL!,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST!,
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
