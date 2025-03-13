import Sidebar from "./components/Sidebar.tsx";
import {useState} from "react";
import {WindowType} from "./types/windowEnum.ts";
import Filters from "./components/Filters.tsx";
import TaskList from "./components/TaskList.tsx";
import PropertyEditor from "./components/PropertyEditor.tsx";

interface Task {
	id: number;
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	message?: string;
}

const App: React.FC = () => {
	const [activeWindow, setActiveWindow] = useState<WindowType>(WindowType.Profile); // Состояние активного окна
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	
	const handleWindowSwitch = (windowName: WindowType) => {
		setActiveWindow(windowName); // Переключаем активное окно
		console.log(`Switched to ${windowName} window`); // Для отладки
	};
	
	const handleSelectTask = (task: Task) => {
		setSelectedTask(task);
	};
	
	const handleClosePropertyEditor = () => {
		setSelectedTask(null);
	};
	
	const handleUpdateTask = (updatedTask: Task) => {
		setSelectedTask(updatedTask);
	};
	
	return (
		<div className="dark flex">
			<Sidebar onWindowSwitch={handleWindowSwitch} activeWindow={activeWindow}/>
			<Filters/>
			<TaskList 
				onSelectTask={handleSelectTask} 
				selectedTask={selectedTask}
				onUpdateTask={handleUpdateTask}
			/>
			{selectedTask && (
				<PropertyEditor 
					task={selectedTask} 
					onClose={handleClosePropertyEditor}
					onUpdateTask={handleUpdateTask}
				/>
			)}
		</div>
	);
};

export default App;