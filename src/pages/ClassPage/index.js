import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SetCard from './SetCard';
import ContainedButton from '../../components/button/ContainedButton';
import Dropdown from './components/Dropdown';
import CopyButton from './components/CopyButton';
import { useParams } from 'react-router-dom';
import { getClass, getClassSet } from '../../utils/api/class';

const ClassPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;
const ClassHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 24px;
  font-family: 'DXSamgakGimbap Medium';
  font-size: 24px;
  .title {
    text-align: start;
  }
`;
const ClassTitleBox = styled.div`
  display: flex;
  margin-right: 50px;
  width: 100%;
`;
const HeaderButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SetColums = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin: 2px 15px;
  border-radius: 14px;
  background-color: transparent;
  font-family: 'DXSamgakGimbap Light';
  font-size: 15px;

  .item-no {
    flex-basis: 7%;
  }
  .item-name {
    flex-basis: 15%;
  }
  .item-set {
    flex-basis: 20%;
  }
  .item-score {
    white-space: pre-line;
    flex-basis: 20%;
  }
  .item-blank {
    white-space: pre-line;
    flex-basis: 5%;
  }
`;

const ClassPage = () => {
  const { id } = useParams();

  const classInitialState = {
    groupName: '',
    groupCode: '',
    id: '',
    studentIds: '',
    teacherId: '',
  };
  const setInitialState = [
    {
      name: '',
      workbookId: '',
      assignmentId: '',
      score: '',
      submitDate: '',
    },
  ];
  const dummies = [
    {
      no: '1',
      name: 'name1',
      set: 'set1',
      score: '30',
    },
    {
      no: '2',
      name: 'name2',
      set: 'set2',
      score: '20',
    },
    {
      no: '3',
      name: 'name3',
      set: 'set3',
      score: '50',
    },
    {
      no: '4',
      name: 'name4',
      set: 'set4',
      score: '10',
    },
  ];

  const [classData, setClassData] = useState(classInitialState);
  const [classSetData, setClassSetData] = useState(setInitialState);
  const [sortedData, setSortedData] = useState(dummies);

  const getClassData = async () => {
    await getClass(id).then((res) => {
      setClassData(res.data);
    });
    await getClassSet(id).then((res) => {
      setClassSetData(res.data);
    });
  };

  useEffect(() => {
    getClassData();
  }, []);

  const items = [
    {
      text: '이름순',
      onClick: () => {
        const sortedByName = [...dummies].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setSortedData(sortedByName);
      },
    },
    {
      text: '성적순',
      onClick: () => {
        const sortedByScore = [...dummies].sort((a, b) => parseInt(a.score) - parseInt(b.score));
        setSortedData(sortedByScore);
      },
    },
  ];

  const btnOnClick = () => {
    window.location.href = `/classSetList/${id}`;
  };

  return (
    <ClassPageLayout>
      <ClassHeader>
        <ClassTitleBox>
          <div className="title">{classData.groupName}</div>
          <CopyButton code={classData.groupCode} />
        </ClassTitleBox>
        <HeaderButtonBox>
          <ContainedButton btnType="primary" size="large" text="이 클래스 세트 보기" onClick={btnOnClick} />
          <Dropdown text="정렬 옵션" items={items} />
        </HeaderButtonBox>
      </ClassHeader>
      <SetColums>
        <div className="item-no">순</div>
        <div className="item-name">이름</div>
        <div className="item-set">마지막으로{'\n'}푼 세트</div>
        <div className="item-score">마지막{'\n'}세트 점수</div>
        <div className="item-blank"></div>
      </SetColums>
      {classSetData.map((data, index) => (
        <SetCard key={data.index} no={data.index + 1} name={data.name} set={data.workbookId} score={data.score} />
      ))}
      {sortedData.map((data, index) => (
        <SetCard key={index} no={index + 1} name={data.name} set={data.set} score={data.score} />
      ))}
    </ClassPageLayout>
  );
};

export default ClassPage;
