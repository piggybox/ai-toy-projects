'use client'

import { useState } from "react"
import styles from "./body.module.css"


export default function Body() {
    const [tone, setTone] = useState("funny")
    const [style, setStyle] = useState("summarize")
    const [writing, setWriting] = useState("")
    const [response, setResponse] = useState("")

    const TYPE = {
        TONE: "tone",
        STYPE: "style"
    }

    const handleToneChange = async (event) => {
        const toneState = event.target.value
        setTone(toneState)
    }

    const handleStyleChange = async (event) => {
        const styleState = event.target.value
        setStyle(styleState)
    }

    return <div>
        <div>
            <select className={styles.tone_change} name="Change tone" id="style-selector"
                onChange={handleToneChange}>
                <option value="funny">Funny</option>
                <option value="professional">Professiona</option>
                <option value="casual">Casual</option>
            </select>
            <button className={styles.submit_button_tone} name='Change tone' id='change_tone_btn'>Change Tone</button>

            <select className={styles.style_change} name='Change Style' id="change_style_dropdown"
                onChange={handleStyleChange}>
                <option value="summarize">Summarize</option>
                <option value="vocab_suggestion">Vocab Suggestion</option>
                <option value="improve">Improve</option>
            </select>
            <button className={styles.submit_button_action} id='change_style_button'>Take Action</button>
        </div>
        <div className={styles.writing_area}>
            <textarea placeholder='Write your content here...' id='input-area'>
            </textarea>
        </div>
        <div className={styles.response_area}>
            <textarea placeholder='AI response' id='response-area'>
            </textarea>
        </div>
    </div>
}