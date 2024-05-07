import React, { useState } from 'react';
import styled from 'styled-components';
import QuestBox from './QuestBox';
import ContainedButton from '../../components/button/ContainedButton';
import { ImgSubmit } from '..';
import { useNavigate } from 'react-router-dom';

const SetListPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;
const ClassListTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  margin: 30px 0 30px 30px;
`;

const StyledWarningText = styled.div`
  padding: 10px;
  color: red;
`;

const StyledQuestLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledQuestCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 70px 10px 30px;

  &:nth-child(1) {
    padding: 0 0 0 40px;
  }
`;

const StyledSubmitBtn = styled(ContainedButton)`
  margin: 20px;
`;

// cnt 문제수
const questDummy = [
  {
    id: 1,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 2,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 3,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 4,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 5,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 6,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 7,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 8,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 9,
    text: '아기가 아장아장 걸어요',
  },
  {
    id: 10,
    text: '아기가 아장아장 걸어요',
  },
];

const TestPage = () => {
  const [userImg, setUserImg] = useState('');
  const navigate = useNavigate();

  const onSumbitHandler = () => {
    if (!userImg) {
      alert('이미지를 넣어주세요');
    }
    
    const formData = new FormData();
    formData.append('file', userImg);
    
  };

  const handleCapture = (e) => {
    if (e.files) {
      if (e.files.length !== 0) {
        const file = e.files[0];
        const newUrl = URL.createObjectURL(file);
        setUserImg(newUrl);
      }
    }
  };

  return (
    <div>
      <SetListPageLayout>
        <ClassListTitle>세트명</ClassListTitle>
        <StyledWarningText>반드시 문제 앞에 번호를 써 주세요.</StyledWarningText>
        <StyledQuestLayout>
          <StyledQuestCol>
            {questDummy
              .filter((data) => data.id <= 5)
              .map((data) => (
                <QuestBox key={data.id} num={data.id} />
              ))}
          </StyledQuestCol>
          <StyledQuestCol>
            {questDummy
              .filter((data) => data.id > 5)
              .map((data) => (
                <QuestBox key={data.id} num={data.id} />
              ))}
          </StyledQuestCol>
        </StyledQuestLayout>
        <StyledSubmitBtn
          onClick={onSumbitHandler}
          btnType="primary"
          size="large"
          text="사진 찍어 제출하기"
        ></StyledSubmitBtn>
        {userImg && <img src={userImg} alt={'userPaper'} />}
        <input
          accept="image/*"
          id="testFile"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
        ></input>
      </SetListPageLayout>
    </div>
  );
};

export default TestPage;
