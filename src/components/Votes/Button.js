import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';


const Button = ({ user_id, token, micropost_id, updateVotesState }) => {

  const votes = [
    { status: 'Agree' },
    { status: 'Not Sure' },
    { status: 'Disagree' },
  ];

  const [errors, setErrors] = useState(null);
  // Initialize the voteLoading  state

  // const [voteLoading, setVoteLoading] = useState(() => ({
  //   loading: false,
  // }));
  const [voteLoading, setVoteLoading] = useState({});

  const handleVote = async (status) => {
    if (!user_id || !token) {
      setErrors("You must be logged in to vote. Click ");
      //window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {

      // Set the loading state to true while fetching likes
      setVoteLoading((prevVoteLoading) => ({
        ...prevVoteLoading,
        [micropost_id]: true,
      }));



      const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${micropost_id}/votes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "user_id": user_id,
          "status": status,
        }),
      });
      if (!res.ok) {
        setErrors('Failed to vote');
      }
      else {
        //Change votes state in Post.js otherwise it wont be reflected that you selected the voting on the browser
        updateVotesState(micropost_id, status); //Call the onVoteSuccess callback with the micropost_id
      }
    } catch (error) {
      setErrors('Failed to vote');
    } finally {
      // Set the loading state back to false after fetching votes
      setVoteLoading((prevVoteLoading) => ({
        ...prevVoteLoading,
        [micropost_id]: false,
      }));

    }

  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-2 border-black">
      <div className="flex justify-between gap-4">
        {votes.map((vote, index) => (
          <ButtonComponent
            key={index}
            label={vote.status}
            onClick={() => voteLoading[micropost_id] ? null : handleVote(vote.status)}
            disabled={voteLoading[micropost_id]}
          />
        ))}
      </div>
    </div>
  );
};

export default Button;