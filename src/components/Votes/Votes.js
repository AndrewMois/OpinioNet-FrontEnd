import React from 'react';
import VotingComponent from './VotingComponent';
import ButtonComponent from './ButtonComponent';

const Votes = ({ agree_count, not_sure_count, disagree_count, user_id, token }) => {

  const votes = [
    { id: 1, subject: 'Agree', count: agree_count },
    { id: 2, subject: 'Not Sure', count: not_sure_count },
    { id: 3, subject: 'Disagree', count: disagree_count },
  ];


  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-2 border-black">
      <h1>Voting Results</h1>
      <VotingComponent votes={votes} />
    </div>
  );


};


export default Votes;
