import React, { useState } from 'react';
import Hashtag from 'components/problem/HashTag';
import { useNavigate } from 'react-router-dom';




interface DropBoxProps {
  selectName: string;
  options: string[];
  paramName?: string;
  onSelect?: (value: string) => void;
}

const DropBox = ({ selectName, options, paramName, onSelect }: DropBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className='font-semibold' 
    style={{ color: "black", fontSize: "12pt" }}
    >
      <label htmlFor={selectName}>{selectName}</label>
      <select name={paramName} id={selectName} onChange={handleChange}>
        <option value="">전체</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};


interface PopularTag {
  id: number;
  name: string;
}

interface PopularTagsProps {
  selectFn: (value: string) => void;
  handleResetTemp: (type: string) => void;
}

const PopularTags = ({ selectFn, handleResetTemp}: PopularTagsProps) => {
  const popularTags: PopularTag[] = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'TypeScript' },
    { id: 4, name: 'Node.js' },
    { id: 5, name: 'CSS' },
    { id: 6, name: 'HTML' },
    { id: 7, name: 'Vue.js' },
    { id: 8, name: 'Angular' },
    { id: 9, name: 'BackEnd' },
    { id: 10, name: 'Java' },
    { id: 11, name: 'Cloud' },
  ];

  const [tags, setTags] = useState<PopularTag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [content, setContent] = useState("");
  const navigate = useNavigate();


  const handleSelectTag = (value: string) => {
    const selectedPopularTag = popularTags.find(tag => tag.name === value);
  
    // 이미 선택된 태그인지 확인
    if (tags.find(tag => tag.name === value)) {
      return;
    }
  
    if (selectedPopularTag) {
      setSelectedTag(selectedPopularTag.name);
      setTags([...tags, selectedPopularTag]);
      setContent("");
      console.log(`검색어: ${content}`);
      // window.history.pushState({}, "", `/problem/list?hashtag=${hashtags}`);
    }
  };
  
  const handleSubmit = () => {
    const hashtags = tags.map(tag => tag.name).join(",");
    selectFn(`hashtag=${hashtags}`); // selectFn 호출
  };
  

  const handleDeleteTag = (id: number) => {
    const updatedTags = tags.filter(tag => tag.id !== id);
    setTags(updatedTags);

    // URL에서 삭제할 태그를 제거합니다.
    const hashtags = updatedTags.map(tag => tag.name).join(",");
    handleResetTemp(`hashtag=${hashtags}`); // handleResetTemp 호출
  };

  const handleClick = (content: string) => {
    const hashtags = [content].join(",");
    navigate(`/list?hashtag=${hashtags}`);
  }

  return (
      <div>
    <DropBox
      selectName="인기태그 :"
      options={popularTags.map(tag => tag.name)}
      onSelect={handleSelectTag}
    />
    {tags.map(tag => (
      <Hashtag
        key={tag.id}
        content={tag.name}
        onClick={() => handleClick(tag.name)}
        onClickDelete={() => handleDeleteTag(tag.id)}
      />
    ))}
    <button className="text-xs py-1 px-3 bg-transparent text-blue-600 font-bold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"

    onClick={handleSubmit}>검색</button>
  </div>

  );
  
};


export default PopularTags;
