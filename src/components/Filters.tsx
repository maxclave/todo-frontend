import React from "react";

export enum FilterType {
	Inbox,
	Completed,
	Labels,
	Trash
}

interface FiltersProps {
	activeFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeFilter, onFilterChange }) => {
	return (
		<div className="w-64 panel p-4 flex flex-col space-y-10">
			<section className="space-y-4">
				<div 
					className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${activeFilter === FilterType.Inbox ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
					onClick={() => onFilterChange(FilterType.Inbox)}
				>
					<span className="text-gray-400">📥</span>
					<span>Входящие</span>
				</div>
			</section>
			
			<div 
				className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${activeFilter === FilterType.Labels ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
				onClick={() => onFilterChange(FilterType.Labels)}
			>
				<span className="text-gray-400">🏷️</span>
				<span>Метки</span>
			</div>
			
			<div 
				className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${activeFilter === FilterType.Completed ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
				onClick={() => onFilterChange(FilterType.Completed)}
			>
				<span className="text-gray-400">✅</span>
				<span>Выполнено</span>
			</div>
			
			<div 
				className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${activeFilter === FilterType.Trash ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
				onClick={() => onFilterChange(FilterType.Trash)}
			>
				<span className="text-gray-400">🛒</span>
				<span>Корзина</span>
			</div>
		</div>
	);
};

export default Filters;