import React, {useState} from 'react';
import ButtonComponent from './ButtonComponent';
import {GridLoader} from "react-spinners";


const Button = ({user_id, token, micropost_id, updateVotesState, setErrors}) => {

    const votes = [
        {status: 'Agree'},
        {status: 'Not Sure'},
        {status: 'Disagree'},
    ];

    // Initialize the voteLoading  state

    // const [voteLoading, setVoteLoading] = useState(() => ({
    //   loading: false,
    // }));
    const [voteLoading, setVoteLoading] = useState({});

    const handleVote = async (status) => {
        if (!user_id || !token) {
            setErrors({"message": "Please, log in to vote or see results"});
            window.scrollTo({top: 0, behavior: 'smooth'});
            return;
        }

        try {

            // Set the loading state to true while fetching likes
            setVoteLoading((prevVoteLoading) => ({
                ...prevVoteLoading,
                [micropost_id]: true,
            }));


            // const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${micropost_id}/votes`, {
            // const res = await fetch(`http://localhost/api/microposts/${micropost_id}/votes`, {
            const res = await fetch(`http://35.183.51.223/api/microposts/${micropost_id}/votes`, {
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
                setErrors({"message": "Error voting: " + res.statusText});
            } else {
                //Change votes state in Post.js otherwise it won't be reflected that you selected the voting on the browser
                updateVotesState(micropost_id, status); //Call the onVoteSuccess callback with the micropost_id
            }
        } catch (error) {
            setErrors({"message": "Error voting: " + error});
        } finally {
            // Set the loading state back to false after fetching votes
            setVoteLoading((prevVoteLoading) => ({
                ...prevVoteLoading,
                [micropost_id]: false,
            }));

        }

    };

    return (
        <div className="p-3 border-t border-black">
            {voteLoading[micropost_id] ?
                (<div className="flex justify-center items-center">
                    <GridLoader size={10} color="#86198f"/>
                </div>) :
                (<div className="flex justify-between gap-4">
                    {votes.map((vote, index) => (
                        <ButtonComponent
                            key={index}
                            label={vote.status}
                            onClick={() => voteLoading[micropost_id] ? null : handleVote(vote.status)}
                            disabled={voteLoading[micropost_id]}
                        />
                    ))}
                </div>)
            }

        </div>
    );
};

export default Button;