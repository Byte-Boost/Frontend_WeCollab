// SortableItem.js
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

export function SortableItem({ id, title }: {id: string,title:string }) {
    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform, isDragging } = useDraggable({
        id: id,
      });
      const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: id,
      });
    
      const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        transition: isDragging ? 'none' : 'transform 250ms ease',
      };
    
      return (
        <div
          ref={(node) => {
            setDraggableNodeRef(node);
            setDroppableNodeRef(node);
          }}
          style={style}
          className="my-12 mx-2 w-72 h-[22rem] bg-[#f0ecec] text-center rounded-md"
          {...listeners}
          {...attributes}
        >
          <div className='flex flex-col'>
            <h1 className='text-black py-1'>{title}</h1>
          </div>
        </div>
      );
    }