import React, { useState } from 'react';
import Textarea from '../components/Textarea';

function MainPage() {
  const [textareaValue, setTextareaValue] = useState('');
  const handleInput = (e) => setTextareaValue(e.target.value);
  return (
    <div>
      메인 페이지입니다.
      <Textarea
        value={textareaValue}
        handleInput={handleInput}
        width={'1000px'}
        placeholder={'Leave a comment'}
      ></Textarea>
    </div>
  );
}

export default MainPage;
