import React from "react";

interface TaskItemProps {
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	isCompleted?: boolean;
	completedDate?: string;
	isSelected?: boolean;
	onCheckboxChange?: (checked: boolean) => void;
	onOptionsClick?: (e: React.MouseEvent) => void;
	isDraggable?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
	title, 
	tags, 
	date, 
	isOverdue,
	isCompleted,
	completedDate,
	isSelected,
	onCheckboxChange,
	onOptionsClick,
	isDraggable
}) => {
	return (
		<div className={`flex items-center justify-between p-2 rounded ${
			isCompleted ? 'bg-green-900' : 'bg-gray-800'
		} ${isDraggable ? 'cursor-move' : ''}`}>
			<div className="flex items-center space-x-2">
				<input 
					type="checkbox" 
					className="text-yellow-400"
					checked={isSelected || false}
					onChange={(e) => onCheckboxChange && onCheckboxChange(e.target.checked)}
					onClick={(e) => e.stopPropagation()}
					disabled={isCompleted}
				/>
				<span className={isOverdue ? 'text-red-500' : isCompleted ? 'text-green-300' : ''}>
					{title}
				</span>
			</div>
			<div className="flex items-center space-x-2">
				{tags.map((tag, index) => (
					<span
						key={index}
						className={`px-2 py-1 rounded ${
							tag === 'Вуз' ? 'bg-yellow-600' : 'bg-gray-600'
						}`}
					>
						{tag}
					</span>
				))}
				
				{isCompleted && completedDate ? (
					<span className="text-green-300">
						Выполнено: {completedDate}
					</span>
				) : (
					<span className={isOverdue ? 'text-red-400' : 'text-gray-400'}>
						{date}
					</span>
				)}
				
				<button 
					className="text-gray-400"
					onClick={onOptionsClick}
				>
					...
				</button>
			</div>
		</div>
	);
};

export default TaskItem;