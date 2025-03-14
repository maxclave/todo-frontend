import TaskItem from './TaskItem';
import React, { useState } from "react";

interface Task {
	id: number;
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	message?: string;
	completed?: boolean;
	completedDate?: string;
	isSelected?: boolean;
}

interface TaskListProps {
	tasks: Task[];
	onSelectTask: (task: Task) => void;
	selectedTask: Task | null;
	onUpdateTask: (task: Task) => void;
	onDeleteTask: (taskId: number) => void;
	onTaskSelection?: (taskId: number, isSelected: boolean) => void;
	isCompletedView: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
	tasks,
	onSelectTask, 
	selectedTask, 
	onUpdateTask,
	onDeleteTask,
	onTaskSelection,
	isCompletedView
}) => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskTags, setNewTaskTags] = useState('');
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	const [showOptionsFor, setShowOptionsFor] = useState<number | null>(null);
	const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);
	
	const handleAddTask = () => {
		if (newTaskTitle.trim()) {
			const newTask: Task = {
				id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
				title: newTaskTitle,
				tags: newTaskTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
				date: new Date().toLocaleDateString('ru-RU', { 
					day: 'numeric', 
					month: 'short',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				}),
				isOverdue: false,
				message: '',
				isSelected: false
			};
			
			onUpdateTask(newTask);
			setNewTaskTitle('');
			setNewTaskTags('');
			setIsAddingTask(false);
		}
	};
	
	const handleDragStart = (task: Task) => {
		if (!isDraggingEnabled) return;
		setDraggedTask(task);
	};
	
	const handleDragOver = (e: React.DragEvent, task: Task) => {
		if (!isDraggingEnabled) return;
		e.preventDefault();
	};
	
	const handleDrop = (targetTask: Task) => {
		if (!isDraggingEnabled || !draggedTask) return;
		
		const draggedIndex = tasks.findIndex(t => t.id === draggedTask.id);
		const targetIndex = tasks.findIndex(t => t.id === targetTask.id);
		
		const newTasks = [...tasks];
		newTasks.splice(draggedIndex, 1);
		newTasks.splice(targetIndex, 0, draggedTask);
		
		// Обновляем порядок задач через родительский компонент
		newTasks.forEach(task => onUpdateTask(task));
		
		setDraggedTask(null);
	};
	
	return (
		<div className="flex-1 p-4 panel">
			<div className="space-y-4">
				{tasks.map((task) => (
					<div 
						key={task.id} 
						draggable={!isCompletedView && isDraggingEnabled}
						onDragStart={() => handleDragStart(task)}
						onDragOver={(e) => handleDragOver(e, task)}
						onDrop={() => handleDrop(task)}
						onClick={() => onSelectTask(task)}
						className="relative"
					>
						<TaskItem
							title={task.title}
							tags={task.tags}
							date={task.date}
							isOverdue={task.isOverdue}
							isCompleted={!!task.completed}
							completedDate={task.completedDate}
							isSelected={task.isSelected}
							onCheckboxChange={!isCompletedView && onTaskSelection ? 
								(checked) => onTaskSelection(task.id, checked) : undefined}
							onOptionsClick={() => setShowOptionsFor(task.id)}
							isDraggable={!isCompletedView && isDraggingEnabled}
						/>

						{showOptionsFor === task.id && (
							<div className="absolute right-2 top-8 bg-gray-800 rounded shadow-lg z-10">
								<button 
									className="block w-full px-4 py-2 text-left hover:bg-gray-700"
									onClick={(e) => {
										e.stopPropagation();
										onDeleteTask(task.id);
										setShowOptionsFor(null);
									}}
								>
									Удалить
								</button>
								{!isCompletedView && (
									<button 
										className="block w-full px-4 py-2 text-left hover:bg-gray-700"
										onClick={(e) => {
											e.stopPropagation();
											setIsDraggingEnabled(!isDraggingEnabled);
											setShowOptionsFor(null);
										}}
									>
										{isDraggingEnabled ? 'Завершить перемещение' : 'Перетащить'}
									</button>
								)}
							</div>
						)}
					</div>
				))}
				
				{!isCompletedView && (
					isAddingTask ? (
						<div className="space-y-2">
							<input
								type="text"
								value={newTaskTitle}
								onChange={(e) => setNewTaskTitle(e.target.value)}
								placeholder="Название задачи"
								className="w-full p-2 bg-gray-800 rounded"
							/>
							<input
								type="text"
								value={newTaskTags}
								onChange={(e) => setNewTaskTags(e.target.value)}
								placeholder="Теги (через запятую)"
								className="w-full p-2 bg-gray-800 rounded"
							/>
							<div className="flex space-x-2">
								<button 
									onClick={handleAddTask}
									className="bg-blue-600 px-3 py-1 rounded"
								>
									Добавить
								</button>
								<button 
									onClick={() => setIsAddingTask(false)}
									className="bg-gray-700 px-3 py-1 rounded"
								>
									Отмена
								</button>
							</div>
						</div>
					) : (
						<button 
							className="text-blue-400 flex items-center space-x-2"
							onClick={() => setIsAddingTask(true)}
						>
							<span>+</span>
							<span>Добавить подзадачу</span>
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default TaskList;