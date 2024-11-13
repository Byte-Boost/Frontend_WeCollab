import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../sortable_item';

interface ActivityBoardProps {
  title?: string;
  cards?: Array<any>;
}

const initialCards = [
  { id: 'card-1', title: 'Inicio' },
  { id: 'card-2', title: 'Em Progresso' },
  { id: 'card-3', title: 'Concluido' },
];

const ActivityBoard = ({ title, cards }: ActivityBoardProps) => {
  const [items, setItems] = useState(initialCards);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className='flex flex-row justify-evenly'>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} title={item.title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ActivityBoard;