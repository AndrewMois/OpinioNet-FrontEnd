import React from 'react';

const VotingComponent = ({votes}) => {

    return (
        <div>
            {votes.map((vote) => (
                <div key={vote.id} className="flex items-center mb-3 h-6">
                    <div className="w-1/4">
                        <span className={`text-sm font-bold ${getSubjectColor(vote.subject)}`}>{vote.subject}</span>
                    </div>
                    {vote.count >= 0 && (
                        <div className="w-1/4">
                            <span className="text-sm">
                                {vote.count === 1 ? "1 vote" : `${vote.count} votes`}
                            </span>
                        </div>
                    )}
                    {vote.count >= 0 && (
                        <div className="w-1/2 bg-gray-200 rounded-lg h-full">
                            <div className="relative h-full bg-gray-100 rounded-lg ">
                                <div
                                    className={`absolute top-0 left-0 h-full opacity-90 ${
                                        vote.subject === "Agree"
                                            ? "bg-fuchsia-800"
                                            : vote.subject === "Not Sure"
                                                ? "bg-sky-700"
                                                : "bg-red-700"
                                    } rounded-lg`}
                                    style={{width: `${vote.percentage.toFixed(1)}%`}}
                                />
                                <span
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black text-white-outline"
                                    style={{lineHeight: "1.5rem"}}>
                                 {vote.percentage.toFixed(1)}%
                                </span>
                            </div>
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
            return 'text-fuchsia-800 ';
        case 'Not Sure':
            return 'text-sky-700 ';
        case 'Disagree':
            return 'text-red-700 ';
        default:
            return '';
    }
};

export default VotingComponent;


