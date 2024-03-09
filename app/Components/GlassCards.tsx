
const features = [{
    title:"Real-Time Collaboration",
    description:"Experience coding like never before with our real-time collaborative code editor. See changes instantly, work together seamlessly, and boost productivity with live updates.",
    icon:"https://pngtree.com/freepng/people-make-puzzles-concept-team-work-illustration-vektor_5356575.html"
},
{
    title:"Multi-Language Support",
    description:"ByteCode supports a wide array of programming languages, making it a versatile platform for diverse projects. From Python and JavaScript to Java and C++, you can collaborate on any codebase effortlessly.",
    icon:"blob:https://lordicon.com/f130c29c-aaf9-405c-bd4c-14ef23763f89"  
},
{
    title:"Easy Integration",
    description:"Integrate Bytecode effortlessly into your existing workflows. Whether you prefer Git, GitHub, or other version control systems, Bytecode adapts to your needs, ensuring a smooth coding experience",
    icon:"blob:https://lordicon.com/f130c29c-aaf9-405c-bd4c-14ef23763f89"  
},
{
    title:"Code Review Made Easy",
    description:"Efficiently review code changes with our intuitive code review features. Provide feedback, suggest improvements, and ensure the quality of your codebase with ease",
    icon:"blob:https://lordicon.com/f130c29c-aaf9-405c-bd4c-14ef23763f89"  
},

];

const GlassCards = () => {
  return (
    <div className="w-full flex flex-wrap text-black my-8">
      {features.map((feature, index) => (
        <div key={index} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="relative overflow-hidden bg-white/30 backdrop-blur-lg rounded-lg shadow-md">
            <img className="w-full h-40 object-cover object-center" src={feature.icon} alt={feature.title} />
            <div className="p-4">
              <p className="text-lg font-semibold text-white">{feature.title}</p>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GlassCards