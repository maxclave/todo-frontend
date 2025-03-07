import TaskItem from './TaskItem';
import React from "react";

const tasks = [
	{
		title: 'сделать тугу лист',
		tags: ['Вуз', 'Тест'],
		date: '28 фев',
		isOverdue: true,
	},
	{
		title: 'подготовить поиск еще сделать, но м6 и пох',
		tags: [],
		date: '28 фев',
		isOverdue: true,
	},
];

const TaskList: React.FC = () => {
	return (
		<div className="flex-1 p-4 panel">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl">Вуз</h1>
				<div className="flex space-x-2">
					<button className="bg-gray-700 px-3 py-1 rounded">...</button>
					<button className="bg-gray-700 px-3 py-1 rounded">28 фев, 2д просрочены</button>
				</div>
			</div>
			
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Делать тугу лист</h2>
				{tasks.map((task, index) => (
					<TaskItem
						key={index}
						title={task.title}
						tags={task.tags}
						date={task.date}
						isOverdue={task.isOverdue}
					/>
				))}
				<button className="text-blue-400 flex items-center space-x-2">
					<span>+</span>
					<span>Добавить подзадачу</span>
				</button>
			</div>
		</div>
	);
};

export default TaskList;