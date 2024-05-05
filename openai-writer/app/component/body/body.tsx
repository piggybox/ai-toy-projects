'use client'

import { useState } from "react"
import styles from "./body.module.css"
import { getResult } from "@/app/service/api-wrapper"


export default function Body() {
    const [tone, setTone] = useState("funny")
    const [style, setStyle] = useState("summarize")
    const [writing, setWriting] = useState("")
    const [response, setResponse] = useState("")

    const TYPE = {
        TONE: "tone",
        STYLE: "style"
    }

    const handleToneChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const toneState = event.target.value;
        setTone(toneState);
    }

    const handleStyleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const styleState = event.target.value;
        setStyle(styleState);
    }

    const getToneValue = async () => {
        getResult({ content: writing, type: TYPE.TONE, context: tone }).then((response) => {
            console.log(response);
            setResponse(response ?? "");
        })
    }

    const getStyleValue = async () => {
        getResult({ content: writing, type: TYPE.STYLE, context: style }).then((response) => {
            console.log(response);
            setResponse(response ?? "");
        })
    }

    return <div>
        <div>
            <select className={styles.tone_change} name="Change tone" id="style-selector"
                onChange={handleToneChange}>
                <option value="funny">Funny</option>
                <option value="professional">Professiona</option>
                <option value="casual">Casual</option>
            </select>
            <button className={styles.submit_button_tone} name='Change tone' id='change_tone_btn'
                onClick={getToneValue}>Change Tone</button>

            <select className={styles.style_change} name='Change Style' id="change_style_dropdown"
                onChange={handleStyleChange}>
                <option value="summarize">Summarize</option>
                <option value="vocab_suggestion">Vocab Suggestion</option>
                <option value="improve">Improve</option>
            </select>
            <button className={styles.submit_button_action} id='change_style_button'
                onClick={getStyleValue}>Take Action</button>
        </div>
        <div className={styles.writing_area}>
            <textarea placeholder='Write your content here...' id='input-area'
                onChange={e => setWriting(e.target.value)}>
            </textarea>
        </div>
        <div className={styles.response_area}>
            <textarea placeholder='AI response' id='response-area' value={response} readOnly={true}>
            </textarea>
        </div>
    </div>
}