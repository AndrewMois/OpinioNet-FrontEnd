import React, {useState} from 'react';

const TextArea = ({setContent}) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        // Pass the value of the textarea to the parent component
        setContent(e.target.value);
    };

    const calculateTextareaHeight = (element) => {
        // first resets the height to auto, then sets it to the scrollHeight of the textarea element.
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    };

    const handleTextareaResize = (e) => {
        calculateTextareaHeight(e.target);
    };

    return (
        <div className="grid">
      <textarea
          className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black resize-none overflow-hidden"
          value={text}
          onChange={handleTextChange}
          onInput={handleTextareaResize}
          placeholder=""
      />
            <div className="hidden">{text}</div>
            {/*Hidden div is added to replicate the value of the textarea.
            The replicated value is used to determine the height of the textarea based on the content.*/}
        </div>
    );
};

export default TextArea;
