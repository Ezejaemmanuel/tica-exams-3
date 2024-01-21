import React from 'react'
import SetQuestionsCard from './aside'
//the first is the examid while the second is the subject
const SetQuestionsPage = ({ params }: { params: { slug: [string, string] } }) => {
    console.log("this is the params", params);
    return (
        <SetQuestionsCard subject={params.slug[0]} examId={params.slug[1]} />
    )
}

export default SetQuestionsPage