import React from 'react';
import VotingComponent from './VotingComponent';

const Votes = () => {
    const votes = [
        { id: 1, subject: 'Agree', count: 10 },
        { id: 2, subject: 'Not Sure', count: 5 },
        { id: 3, subject: 'Disagree', count: 7 },
    ];

    return (
        <div
            className="bg-white rounded-2xl shadow-md p-4 mb-4  border-2 border-black"
        >
            <h1>Voting Results</h1>
            <VotingComponent votes={votes} />
        </div>
    );
};

export default Votes;
