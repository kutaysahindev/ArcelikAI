import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ChoiceInput } from '../Input/ChoiceInput';
import { RxDragHandleDots1 } from 'react-icons/rx';
import { FaArrowsAltV, FaRegTrashAlt } from 'react-icons/fa';
import './DragAndSort.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChoiceHandler, setAnswer, setChoices, setMultipleAnswer, setSortingAnswer } from '../../../redux/uploadDBSlice';
import { AddChoiceInput } from '../Input/AddChoiceInput';
import { useEffect } from 'react';

export const DragAndSort = () => {
  const { choices } = useSelector((s) => s.uploadDB);
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(choices);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setChoices(items));
    dispatch(setSortingAnswer(items));
  }

  useEffect(() => {
    dispatch(setSortingAnswer(choices));
  }, [choices])
  
  return (
    <div className="drag-n-sort-box">
      <AddChoiceInput />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'sortedOptions'}>
          {(provided, snapshot) => (
            <div
              className={`list ${snapshot.isDraggingOver ? 'l-dragging' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {choices?.map(({ oID, option }, index) => {
                return (
                  <Draggable
                    key={String(oID)}
                    draggableId={String(oID)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`dnd-option ${snapshot.isDragging ? 'o-dragging' : ''}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ChoiceInput
                          key={oID}
                          label={'Choice ' + (index + 1)}
                          choice={{ oID, option }}
                        >
                          <FaRegTrashAlt
                            size={13}
                            onClick={() => dispatch(deleteChoiceHandler(oID))}
                            className="btn trash"
                          />
                          <FaArrowsAltV size={13} className={`btn handle`} />
                        </ChoiceInput>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
