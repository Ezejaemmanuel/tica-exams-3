// import React from 'react';
// import { useIsMutating, useMutationState } from '@tanstack/react-query';
// import { PuffLoader } from 'react-spinners'; // Import the spinner
// import { MdCheckCircle, MdCancel } from 'react-icons/md'; // Import icons for success and error

// interface AnswerMutationStateProps {
//     mutationKey: string[];
// }

// const AnswerMutationState: React.FC<AnswerMutationStateProps> = ({ mutationKey }) => {
//     const data = useMutationState({
//         filters: { mutationKey },
//         select: (mutation) => mutation.state.status
//     });
//     const isMutatingPosts = useIsMutating({ mutationKey: mutationKey });
//     console.log("thsi is the amout of mutation that is mutation ", isMutatingPosts, "this is the mutation key")
//     console.log("this is the mtation key", mutationKey);
//     const currentState = data[0] // Access the current state status
//     console.log("this is the data from the mutation state", data);

//     // Conditionally render based on the mutation's current state
//     let content;
//     if (currentState === 'pending') {
//         content = <PuffLoader color="#36D7B7" size={"24px"} />; // Display spinner when loading
//     } else if (currentState === 'success') {
//         content = <MdCheckCircle color="green" size="24px" />; // Display checkmark icon when successful
//     } else if (currentState === 'error') {
//         content = <MdCancel color="red" size="24px" />; // Display cancel icon when there's an error
//     } else {
//         // When there is no current state, return null to render nothing
//         return null;
//     }

//     return (
//         <div>{content}</div>
//     );
// }

// export default AnswerMutationState;

import React, { useEffect, useState } from 'react';
import { useMutationState } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners'; // Ensure you have @emotion/react installed for react-spinners to work
import { MdCheckCircle, MdCancel } from 'react-icons/md';

interface AnswerMutationStateProps {
    mutationKey: string[];
}

const AnswerMutationState: React.FC<AnswerMutationStateProps> = ({ mutationKey }) => {
    const data = useMutationState({
        filters: { mutationKey },
        select: (mutation) => mutation.state.status
    });

    // State to manage which mutation indices should be displayed
    const [displayedIndices, setDisplayedIndices] = useState<number[]>([]);

    useEffect(() => {
        // Initially set all indices to be displayed
        setDisplayedIndices(data.map((_, index) => index));

        // Iterate over data to set timeouts for success or error states
        data.forEach((status, index) => {
            if (status === 'success' || status === 'error') {
                setTimeout(() => {
                    setDisplayedIndices(current => current.filter(i => i !== index));
                }, 3000);
            }
        });
    }, [data]);

    return (
        <div className="flex gap-2">
            {data.map((status, index) => {
                if (!displayedIndices.includes(index)) {
                    return null;
                }

                let content;
                if (status === 'pending') {
                    content = <PuffLoader color="#36D7B7" size={24} />;
                } else if (status === 'success') {
                    content = <MdCheckCircle className="text-green-500" size="24" />;
                } else if (status === 'error') {
                    content = <MdCancel className="text-red-500" size="24" />;
                } else {
                    return null;
                }

                return <div key={index}>{content}</div>;
            })}
        </div>
    );
}

export default AnswerMutationState;
