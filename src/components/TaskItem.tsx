import React from "react";

interface TaskItemProps {
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	onOptionsClick?: () => void;
	isDraggable?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
	title, 
	tags, 
	date, 
	isOverdue,
	onOptionsClick,
	isDraggable
}) => {
	return (
		<div className={`flex items-center justify-between p-2 bg-gray-800 rounded ${isDraggable ? 'cursor-move' : ''}`}>
			<div className="flex items-center space-x-2">
				<input type="checkbox" className="text-yellow-400"/>
				<span className={isOverdue ? 'text-red-500' : ''}>{title}</span>
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
				<span className={isOverdue ? 'text-red-400' : 'text-gray-400'}>
					{date}
				</span>
				<button 
					className="text-gray-400"
					onClick={(e) => {
						e.stopPropagation();
						onOptionsClick?.();
					}}
				>
					...
				</button>
			</div>
		</div>
	);
};

export default TaskItem;