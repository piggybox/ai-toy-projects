interface FormProps {
  prompt: string
  setPrompt: any
  onSubmit: any
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <div>
      <p>Tell me about the question you want to ask</p>
      <input
        className="p-2 w-full rounded-md focus:outline-blue-400 focus:outline text-slate-700"
        type="text"
        placeholder="question?"
        onChange={(e) => props.setPrompt(e.currentTarget.value)}
        value={props.prompt}
      />
      <div className={" flex justify-between my-2 mb-6 text-sm"}></div>
      <button
        className="bg-gradient-to-r from-blue-400 
        to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
      >
        Submit
      </button>
    </div>
  )
}

export default Form
