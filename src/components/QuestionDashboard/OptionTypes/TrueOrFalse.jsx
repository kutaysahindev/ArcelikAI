import { useEffect, useState } from 'react';
import { Dropdown } from '../../Dropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { setAnswer } from '../../../redux/uploadDBSlice';

const questionTypes = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
];

export const TrueOrFalse = () => {
  // const { answer } = useSelector((s) => s.uploadDB);
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(questionTypes[0]);

  // const selectHandler = (opt) => {
  //   setSelectedType(opt)
  //   dispatch(setAnswer(opt))
  // }
  
  useEffect(() => {
      dispatch(setAnswer(selectedType.value))
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
