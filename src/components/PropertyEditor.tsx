import React, { useState, useEffect, useRef } from 'react';

interface Task {
	id: number;
	title: string;
	tags: string[];
	date: string;
	isOverdue: boolean;
	message?: string;
}

interface PropertyEditorProps {
	task: Task | null;
	onClose: () => void;
	onUpdateTask: (task: Task) => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ task, onClose, onUpdateTask }) => {
	const [replyText, setReplyText] = useState('');
	const [isReplying, setIsReplying] = useState(false);
	const [taskTitle, setTaskTitle] = useState(task?.title || '');
	const [taskMessage, setTaskMessage] = useState(task?.message || '');
	const [width, setWidth] = useState(400);
	const [isDragging, setIsDragging] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);
	
	// Обновляем состояния при изменении выбранной задачи
	useEffect(() => {
		if (task) {
			setTaskTitle(task.title);
			setTaskMessage(task.message || '');
		}
	}, [task]);
	
	// Обработчик начала перетаскивания
	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	// Обработчик перетаскивания
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging && editorRef.current) {
				const newWidth = window.innerWidth - e.clientX;
				setWidth(Math.min(Math.max(newWidth, 300), 800));
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);
	
	// Добавляем функцию сохранения
	const handleSave = () => {
		if (task) {
			const updatedTask = {
				...task,
				title: taskTitle,
				message: taskMessage
			};
			onUpdateTask(updatedTask);
		}
	};
	
	if (!task) {
		return null;
	}
	
	return (
		<div 
			ref={editorRef}
			className="panel relative" 
			style={{ 
				width: `${width}px`,
				minWidth: '300px',
				maxWidth: '800px'
			}}
		>
			{/* Полоса для перетаскивания */}
			<div
				className="absolute left-0 top-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors"
				onMouseDown={handleMouseDown}
				style={{
					backgroundColor: isDragging ? '#3b82f6' : 'transparent'
				}}
			/>

			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<button className="mr-2" onClick={onClose}>❌</button>
						<input type="checkbox" className="w-4 h-4 mr-8"/>
						<div className={`text-sm ${task.isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
							{task.isOverdue ? '7 дней назад, ' : ''}{task.date}
						</div>
					</div>
					<button 
						onClick={handleSave}
						className="bg-green-600 px-3 py-1 rounded"
					>
						Сохранить
					</button>
				</div>
				
				<input 
					type="text" 
					className="text-xl font-bold mb-2 bg-transparent w-full" 
					value={taskTitle}
					onChange={(e) => setTaskTitle(e.target.value)}
				/>
				
				{/* Tags */}
				<div className="flex flex-wrap gap-2 mb-4">
					{task.tags.map((tag, index) => (
						<span
							key={index}
							className={`px-2 py-1 rounded ${
								tag === 'Вуз' ? 'bg-yellow-600' : 'bg-gray-600'
							}`}
						>
							{tag}
						</span>
					))}
				</div>
				
				{/* Message Content */}
				<textarea 
					className="text-gray-300 mb-4 w-full bg-transparent" 
					value={taskMessage}
					onChange={(e) => setTaskMessage(e.target.value)}
				/>
				
				{/* Reply Section */}
				{!isReplying ? (
					<button
						onClick={() => setIsReplying(true)}
						className="bg-yellow-600 text-white px-4 py-2 rounded flex items-center space-x-2"
					>
						<span>Вы</span>
						<span className="w-4 h-4 bg-blue-500 rounded-full"></span>
					</button>
				) : (
					<div className="flex space-x-2 mb-4">
						<input
							type="text"
							value={replyText}
							onChange={(e) => setReplyText(e.target.value)}
							placeholder="Введите ответ..."
							className="flex-1 p-2 bg-gray-800 text-white rounded"
						/>
						<button
							onClick={() => {
								if (replyText.trim()) {
									setReplyText('');
									setIsReplying(false);
								}
							}}
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							Отправить
						</button>
					</div>
				)}
				
				{/* Reply Message (example) */}
				<div className="mt-4">
					<div className="flex justify-between items-center mb-2">
						<div className="text-red-500 text-sm">26 февр.</div>
					</div>
					<p className="text-blue-400">Добавить подзадачу</p>
				</div>
			</div>
		</div>
	);
};

export default PropertyEditor;