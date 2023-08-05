import React from 'react';

const VotingComponent = ({ votes }) => {

    return (
        <div>
            {votes.map((vote) => (
                <div key={vote.id} className="flex items-center mb-2">
                    <div className="w-1/4">
                        <span className={`text-sm font-bold ${getSubjectColor(vote.subject)}`}>{vote.subject}</span>
                    </div>
                    {vote.count > 0 && (
                        <div className="w-1/4">
                            <span className="text-sm">
                                {vote.count === 1 ? "1 vote" : `${vote.count} votes`}
                            </span>
                        </div>
                    )}
                    {vote.count > 0 && (
                        <div className="w-1/2 bg-gray-200 rounded-lg">
                            <div
                                className={`h-2 ${vote.subject === "Agree" ? "bg-blue-500" :
                                    vote.subject === "Not Sure" ? "bg-green-500" : "bg-red-500"
                                    } rounded-lg`}
                                style={{ width: `${vote.percentage.toFixed(1)}%` }}
                            />
                            <span className="ml-2 text-sm">{vote.percentage.toFixed(1)}%</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const getSubjectColor = (subject) => {
    switch (subject) {
        case 'Agree':
            return 'text-blue-500 ';
        case 'Not Sure':
            return 'text-green-500 ';
        case 'Disagree':
            return 'text-red-500 ';
        default:
            return '';
    }
};

export default VotingComponent;


