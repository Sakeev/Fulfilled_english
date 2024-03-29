import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useEffect, useState } from 'react'

const Vocabulary = ({ vocabTasks = [], showVocab, setShowVocab }) => {
    const [words, setWords] = useState([])

    useEffect(() => {
        if (vocabTasks.length) {
            let temp = vocabTasks.map(({ tasks }) => tasks[0]?.description)
            setWords([...new Set(temp.flat(Infinity))])
        }
    }, [vocabTasks])

    return (
        <>
            <Accordion
                expanded={showVocab}
                onChange={() => setShowVocab((prev) => !prev)}
                sx={{ boxShadow: 'none' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: '0' }}
                >
                    <h2>Vocabulary</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="vocabulary-box">
                        {words?.map((word, index) => (
                            <p className="vocabulary-word" key={index}>
                                {word?.toLowerCase().split('_').join(' ')}
                            </p>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Vocabulary
