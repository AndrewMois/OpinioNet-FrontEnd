import React from 'react';

const VotingComponent = ({votes}) => {
    const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

    return (
        <div>
            {votes.map((vote) => (
                <div key={vote.id} className="flex items-center mb-2">
                    <div className="w-1/4">
                        <span className="text-sm">{vote.subject}</span>
                    </div>
                    <div className="w-3/4 bg-gray-200 rounded-lg">
                        <div
                            className="h-2 bg-blue-500 rounded-lg"
                            style={{width: `${(vote.count / totalVotes) * 100}%`}}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VotingComponent;
