import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { cn } from '../utils/cn';
import { Grip, Pencil } from 'lucide-react';
import type { ModulesListProps } from '@/types';
import { Badge } from './ui/badge';

export const ModulesList = ({ items, onReorder, onEdit }: ModulesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modules, setModules] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setModules(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setModules(items);

    const bulkUpdateData = items.map((module, index) => ({
      id: module._id,
      position: index,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(snapshot.isDraggingOver && 'bg-slate-100 dark:bg-slate-800')}
          >
            {modules.map((module, index) => (
              <Draggable key={module._id?.toString()} draggableId={module._id?.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 dark:bg-white/[0.03] border dark:text-white rounded-md mb-4 text-sm',
                      module.isPublished && 'bg-sky-100 border-slate-700 text-sky-700',
                      snapshot.isDragging && 'bg-slate-300 dark:bg-slate-700 shadow-md'
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'px-2 py-3 border-r border-r-slate-800 hover:bg-slate-300 rounded-l-md transition cursor-grab active:cursor-grabbing',
                        module.isPublished && 'border-r-slate-700 hover:bg-sky-200',
                        snapshot.isDragging && 'bg-slate-300 dark:bg-slate-600'
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {module.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {module.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn('bg-slate-500', module.isPublished && 'bg-sky-700')}
                      >
                        {module.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(module._id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};