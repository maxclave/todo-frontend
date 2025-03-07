import Sidebar from "./components/Sidebar.tsx";
import {useState} from "react";
import {WindowType} from "./types/windowEnum.ts";
import Filters from "./components/Filters.tsx";
import TaskList from "./components/TaskList.tsx";
import PropertyEditor from "./components/PropertyEditor.tsx";

const App: React.FC = () => {
	const [activeWindow, setActiveWindow] = useState<WindowType>(WindowType.Profile); // Состояние активного окна
	
	const handleWindowSwitch = (windowName: WindowType) => {
		setActiveWindow(windowName); // Переключаем активное окно
		console.log(`Switched to ${windowName} window`); // Для отладки
	};
	
	return (
		
		<div className="dark flex">
			<Sidebar onWindowSwitch={handleWindowSwitch} activeWindow={activeWindow}/>
			<Filters/>
			<TaskList/>
			<PropertyEditor
				title="Сделать туду лист"
				message="тут описание типа у задачи (еще файлы закрепить можно, но может в пизду такой функционал)"
				date="28 февр."/>
		</div>
	);
};

export default App;