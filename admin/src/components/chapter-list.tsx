import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { cn } from '../utils/cn';
import { Grip, Pencil } from 'lucide-react';
import type { ChaptersListProps } from '@/types';
import { Badge } from './ui/badge';

export const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("chapterList : -",chapters)
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChapters(items);

    const bulkUpdateData = items.map((chapter, index) => ({
      id: chapter._id,
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
            {chapters.map((chapter, index) => (
              <Draggable key={chapter._id?.toString()} draggableId={chapter._id?.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 dark:bg-white/[0.03] border dark:text-white rounded-md mb-4 text-sm',
                      chapter.isPublished && 'bg-sky-100 border-slate-700 text-sky-700',
                      snapshot.isDragging && 'bg-slate-300 dark:bg-slate-700 shadow-md'
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'px-2 py-3 border-r border-r-slate-800 hover:bg-slate-300 rounded-l-md transition cursor-grab active:cursor-grabbing',
                        chapter.isPublished && 'border-r-slate-700 hover:bg-sky-200',
                        snapshot.isDragging && 'bg-slate-300 dark:bg-slate-600'
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn('bg-slate-500', chapter.isPublished && 'bg-sky-700')}
                      >
                        {chapter.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter._id)}
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