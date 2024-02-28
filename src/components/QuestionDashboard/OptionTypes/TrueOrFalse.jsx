import { useEffect, useState } from 'react';
import { Dropdown } from '../../Dropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { setAnswer, setChoices } from '../../../redux/uploadDBSlice';

const questionTypes = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
];

const trueFalseOptions = [
  {
    oID: 0,
    option: "True"
  },
  {
    oID: 1,
    option: "False"
  },
]

export const TrueOrFalse = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(questionTypes[0]);
  
  useEffect(() => {
      dispatch(setAnswer([selectedType.label]))
      dispatch(setChoices(trueFalseOptions))
  }, [selectedType])
  

  return (
    <div>
      <Dropdown
        label="Answer"
        options={questionTypes}
        selected={selectedType}
        selector={setSelectedType}
        z={0}
      />
    </div>
  );
};
