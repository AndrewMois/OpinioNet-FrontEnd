import React from 'react';
import VotingComponent from './VotingComponent';


const Votes = ({ agree_count, not_sure_count, disagree_count, user_id, token }) => {

  const totalVotes = agree_count + not_sure_count + disagree_count;

  const votes = [
    { id: 1, subject: 'Agree', count: agree_count, percentage: (agree_count / totalVotes) * 100 },
    { id: 2, subject: 'Not Sure', count: not_sure_count, percentage: (not_sure_count / totalVotes) * 100 },
    { id: 3, subject: 'Disagree', count: disagree_count, percentage: (disagree_count / totalVotes) * 100 },
  ];


  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-2 border-black">
      <h1 className="font-bold">Voting Results</h1>
      <VotingComponent votes={votes} />
    </div>
  );


};


export default Votes;
