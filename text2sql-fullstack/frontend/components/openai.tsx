import React from "react"
import Form from "./form"
import Results from "./result"

const Prototype: React.FC = () => {
  const [prompt, setPrompt] = React.useState("")
  const [query, setQuery] = React.useState("")
  const [hasResult, setHasResult] = React.useState(false)

  const END_POINT = "http://127.0.0.1:8000/query"
  const onSubmit = () => {
    console.log("submitting: " + prompt)
    fetch(`${END_POINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult)
  }

  const onResult = (data: any) => {
    setQuery(data.query)
    setHasResult(true)
  }

  const onReset = (data: any) => {
    setQuery("")
    setHasResult(false)
  }

  let displayedElement = null
  if (hasResult) {
    displayedElement = <Results query={query} onBack={onReset}></Results>
  } else {
    displayedElement = (
      <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} />
    )
  }

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto"

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            {/* <Image src={logo} width={42} height={42} /> */}
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              AI Query Generator
            </h1>
            <div className={gradientTextStyle}>
              Ask data questions without SQL
            </div>
          </div>

          <div className="mb-6 text-slate-400">
            <p>Tell me what you want to know</p>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  )
}

export default Prototype
