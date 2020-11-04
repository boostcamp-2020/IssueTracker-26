import React from 'react';
import Textarea from '../components/Textarea';

function MainPage() {
  return (
    <div>
      메인 페이지입니다.
      <Textarea width={'500px'} placeholder={'Leave a comment'}></Textarea>
    </div>
  );
}

export default MainPage;
