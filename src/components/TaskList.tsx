import TaskItem from './TaskItem';
import React, { useState, useEffect } from "react";

interface Task {
	id: number;
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	message?: string;
}

interface TaskListProps {
	onSelectTask: (task: Task) => void;
	selectedTask: Task | null;
	onUpdateTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
	onSelectTask, 
	selectedTask, 
	onUpdateTask 
}) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskTags, setNewTaskTags] = useState('');
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	const [showOptionsFor, setShowOptionsFor] = useState<number | null>(null);
	const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);
	
	useEffect(() => {
		if (selectedTask) {
			setTasks(tasks.map(task => 
				task.id === selectedTask.id ? selectedTask : task
			));
		}
	}, [selectedTask]);
	
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
				message: ''
			};
			
			setTasks([...tasks, newTask]);
			setNewTaskTitle('');
			setNewTaskTags('');
			setIsAddingTask(false);
		}
	};
	
	const handleDeleteTask = (taskId: number) => {
		setTasks(tasks.filter(task => task.id !== taskId));
		setShowOptionsFor(null);
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
		
		const newTasks = [...tasks];
		const draggedIndex = tasks.findIndex(t => t.id === draggedTask.id);
		const targetIndex = tasks.findIndex(t => t.id === targetTask.id);
		
		newTasks.splice(draggedIndex, 1);
		newTasks.splice(targetIndex, 0, draggedTask);
		
		setTasks(newTasks);
		setDraggedTask(null);
	};
	
	return (
		<div className="flex-1 p-4 panel">
			<div className="space-y-4">
				{tasks.map((task) => (
					<div 
						key={task.id} 
						draggable={isDraggingEnabled}
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
							onOptionsClick={() => setShowOptionsFor(task.id)}
							isDraggable={isDraggingEnabled}
						/>

						{showOptionsFor === task.id && (
							<div className="absolute right-2 top-8 bg-gray-800 rounded shadow-lg z-10">
								<button 
									className="block w-full px-4 py-2 text-left hover:bg-gray-700"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteTask(task.id);
									}}
								>
									Удалить
								</button>
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
							</div>
						)}
					</div>
				))}
				
				{isAddingTask ? (
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
				)}
			</div>
		</div>
	);
};

export default TaskList;