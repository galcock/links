'use client';

import React, { useState } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/modal';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  GripVertical,
  Flag,
  Tag,
  Clock,
} from 'lucide-react';

interface WorkspaceTask {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  assignees?: Array<{ id: string; name: string; avatar?: string }>;
  tags?: string[];
  commentsCount?: number;
  attachmentsCount?: number;
}

interface WorkspaceColumn {
  id: string;
  name: string;
  color?: string;
}

interface WorkspaceProps {
  columns: WorkspaceColumn[];
  tasks: WorkspaceTask[];
  onTaskMove?: (taskId: string, newColumnId: string) => void;
  onTaskCreate?: (columnId: string, title: string) => void;
  onTaskClick?: (task: WorkspaceTask) => void;
  accentColor?: string;
}

const priorityColors = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  high: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400',
  urgent: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
};

// Sortable Task Card
function SortableTaskCard({
  task,
  onClick,
}: {
  task: WorkspaceTask;
  onClick?: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-background border rounded-xl p-3 cursor-pointer transition-all',
        'hover:shadow-md hover:border-primary/30',
        isDragging && 'opacity-50 shadow-lg rotate-2'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-2">{task.title}</h4>

          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.dueDate && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(task.dueDate, { month: 'short', day: 'numeric' })}
                </span>
              )}
              <Badge className={priorityColors[task.priority]} size="sm">
                {task.priority}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {task.commentsCount ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {task.commentsCount}
                </span>
              ) : null}
              {task.attachmentsCount ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Paperclip className="h-3 w-3" />
                  {task.attachmentsCount}
                </span>
              ) : null}
            </div>
          </div>

          {task.assignees && task.assignees.length > 0 && (
            <div className="mt-2">
              <AvatarGroup
                avatars={task.assignees.map((a) => ({
                  src: a.avatar,
                  fallback: a.name,
                }))}
                max={3}
                size="xs"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Workspace Column
function WorkspaceColumnComponent({
  column,
  tasks,
  onAddTask,
  onTaskClick,
}: {
  column: WorkspaceColumn;
  tasks: WorkspaceTask[];
  onAddTask: (title: string) => void;
  onTaskClick?: (task: WorkspaceTask) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle);
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: column.color || '#6B7280' }}
          />
          <h3 className="font-medium">{column.name}</h3>
          <Badge variant="secondary" size="sm">
            {tasks.length}
          </Badge>
        </div>
        <Button variant="ghost" size="iconSm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 min-h-[200px]">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick?.(task)}
            />
          ))}
        </SortableContext>

        {isAdding ? (
          <div className="bg-background border rounded-xl p-3 space-y-2">
            <Input
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddTask}>
                Add
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsAdding(false);
                  setNewTaskTitle('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        )}
      </div>
    </div>
  );
}

export function Workspace({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskClick,
  accentColor = 'primary',
}: WorkspaceProps) {
  const [activeTask, setActiveTask] = useState<WorkspaceTask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (over && active.id !== over.id) {
      // Find the column the task was dropped into
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask && onTaskMove) {
        onTaskMove(active.id as string, overTask.columnId);
      }
    }
  };

  const getColumnTasks = (columnId: string) =>
    tasks.filter((t) => t.columnId === columnId);

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle>Project Board</CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <WorkspaceColumnComponent
                key={column.id}
                column={column}
                tasks={getColumnTasks(column.id)}
                onAddTask={(title) => onTaskCreate?.(column.id, title)}
                onTaskClick={onTaskClick}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-background border rounded-xl p-3 shadow-2xl rotate-3 w-72">
                <h4 className="font-medium text-sm">{activeTask.title}</h4>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardContent>
    </Card>
  );
}
