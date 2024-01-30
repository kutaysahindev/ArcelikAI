import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Questions.css";
import { RiListOrdered2 } from "react-icons/ri";
import { PiSortAscendingBold, PiSortDescendingBold } from "react-icons/pi";
import { useSelector } from "react-redux";


export const DragAndSortQ = ({ id, addRes, question, options }) => {
  const { responses } = useSelector(state => state.quiz);
  const [sortedOptions, setSortedOptions] = useState(responses["Q"+id] ? responses["Q"+id] :options);

  useEffect(() => {
    addRes(id, sortedOptions)
  }, [sortedOptions])
  

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(sortedOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSortedOptions(items);
  }

  return (
    <div className="question drag-and-sort">
      <PiSortAscendingBold size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sortedOptions">
              {(provided, snapshot) => (
                <ul className={`list ${snapshot.isDraggingOver ? 'l-dragging' : ''}`} {...provided.droppableProps} ref={provided.innerRef}>
                  {sortedOptions.map(({oID, option}, index) => {
                    return (
                      <Draggable key={String(oID)} draggableId={String(oID)} index={index}>
                        {(provided, snapshot) => 
                          <li className={`option ${snapshot.isDragging ? 'o-dragging' : ''}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            { option }
                          </li>
                        }
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {/* <p>order: { sortedOptions.map(o => <span key={o.oID}>{ o.option } - </span>) }</p> */}
    </div>
  )
}