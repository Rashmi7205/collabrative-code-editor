export const languages = [
    {
      name:"Javascript",
      value:"javascript",
    },
    {
      name:"c",
      value:"c",
    },
    {
      name:"c++",
      value:"cpp",
    },
    {
      name:"java",
      value:"java"
    },
    {
      name:"python",
      value:"python"
    }

  ];

 export  const programmingLanguages = {
    "javascript": {
      "displayName": "javascript",
      "defaultCode": 'console.log("Hello, World!");',
      "defaultFileName": "index.js"
    },
    "python": {
      "displayName": "python",
      "defaultCode": 'print("Hello, World!")',
      "defaultFileName": "script.py"
    },
    "java": {
      "displayName": "java",
      "defaultCode": 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      "defaultFileName": "Main.java"
    },
    "c": {
      "displayName": "c",
      "defaultCode": '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      "defaultFileName": "main.c"
    },
    "cpp": {
      "displayName": "cpp",
      "defaultCode": '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
      "defaultFileName": "main.cpp"
    }
  }

  