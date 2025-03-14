import Sidebar from "./components/Sidebar.tsx";
import { useState, useEffect } from "react";
import { WindowType } from "./types/windowEnum.ts";
import Filters, { FilterType } from "./components/Filters.tsx";
import TaskList from "./components/TaskList.tsx";
import PropertyEditor from "./components/PropertyEditor.tsx";

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

const App: React.FC = () => {
	const [activeWindow, setActiveWindow] = useState<WindowType>(WindowType.Profile);
	const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.Inbox);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
	
	const handleWindowSwitch = (windowName: WindowType) => {
		setActiveWindow(windowName);
		console.log(`Switched to ${windowName} window`);
	};
	
	const handleFilterChange = (filter: FilterType) => {
		setActiveFilter(filter);
		setSelectedTask(null);
	};
	
	const handleSelectTask = (task: Task) => {
		setSelectedTask(task);
	};
	
	const handleClosePropertyEditor = () => {
		setSelectedTask(null);
	};
	
	const handleUpdateTask = (updatedTask: Task) => {
		if (activeFilter === FilterType.Completed) {
			// Для выполненных задач обновление не разрешено
			return;
		}
		
		// Проверяем, существует ли задача с таким id
		const existingTaskIndex = tasks.findIndex(task => task.id === updatedTask.id);
		
		if (existingTaskIndex !== -1) {
			// Если задача существует, обновляем её
			setTasks(tasks.map(task => 
				task.id === updatedTask.id ? updatedTask : task
			));
		} else {
			// Если задачи с таким id нет, добавляем новую
			setTasks([...tasks, updatedTask]);
		}
		
		// Устанавливаем выбранную задачу
		setSelectedTask(updatedTask);
	};
	
	const handleTaskSelection = (taskId: number, isSelected: boolean) => {
		setTasks(tasks.map(task => 
			task.id === taskId ? { ...task, isSelected } : task
		));
	};
	
	const handleCompleteSelectedTasks = () => {
		const selectedTasks = tasks.filter(task => task.isSelected);
		if (selectedTasks.length === 0) return;
		
		const now = new Date();
		const completedDate = now.toLocaleDateString('ru-RU', { 
			day: 'numeric', 
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
		
		// Добавляем выбранные задачи в список выполненных
		const newCompletedTasks = selectedTasks.map(task => ({
			...task,
			completed: true,
			completedDate,
			isSelected: false
		}));
		
		setCompletedTasks([...completedTasks, ...newCompletedTasks]);
		
		// Удаляем выбранные задачи из основного списка
		setTasks(tasks.filter(task => !task.isSelected));
	};
	
	const handleDeleteTask = (taskId: number) => {
		if (activeFilter === FilterType.Completed) {
			setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
			if (selectedTask && selectedTask.id === taskId) {
				setSelectedTask(null);
			}
		} else {
			setTasks(tasks.filter(task => task.id !== taskId));
			if (selectedTask && selectedTask.id === taskId) {
				setSelectedTask(null);
			}
		}
	};
	
	// Определяем, какие задачи показывать в зависимости от активного фильтра
	const getFilteredTasks = () => {
		switch (activeFilter) {
			case FilterType.Completed:
				return completedTasks;
			case FilterType.Inbox:
			default:
				return tasks;
		}
	};
	
	return (
		<div className="dark flex">
			<Sidebar onWindowSwitch={handleWindowSwitch} activeWindow={activeWindow}/>
			<Filters activeFilter={activeFilter} onFilterChange={handleFilterChange}/>
			
			{activeFilter === FilterType.Inbox && (
				<div className="flex-1 flex flex-col">
					<div className="p-2 bg-gray-800">
						<button 
							onClick={handleCompleteSelectedTasks}
							className="bg-green-600 px-3 py-1 rounded"
						>
							Выполнить выбранные
						</button>
					</div>
					<TaskList 
						tasks={getFilteredTasks()}
						onSelectTask={handleSelectTask} 
						selectedTask={selectedTask}
						onUpdateTask={handleUpdateTask}
						onDeleteTask={handleDeleteTask}
						onTaskSelection={handleTaskSelection}
						isCompletedView={false}
					/>
				</div>
			)}
			
			{activeFilter === FilterType.Completed && (
				<TaskList 
					tasks={getFilteredTasks()}
					onSelectTask={handleSelectTask} 
					selectedTask={selectedTask}
					onUpdateTask={handleUpdateTask}
					onDeleteTask={handleDeleteTask}
					isCompletedView={true}
				/>
			)}
			
			{selectedTask && (
				<PropertyEditor 
					task={selectedTask} 
					onClose={handleClosePropertyEditor}
					onUpdateTask={handleUpdateTask}
					isReadOnly={activeFilter === FilterType.Completed}
				/>
			)}
		</div>
	);
};

export default App;