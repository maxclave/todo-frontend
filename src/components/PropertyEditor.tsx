import React, { useState } from 'react';

interface PropertyEditorProps {
	taskId: number;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ taskId }) => {
	const [replyText, setReplyText] = useState('');
	const [isReplying, setIsReplying] = useState(false);
	
	const handleReplyClick = () => {
		setIsReplying(true);
	};
	
	const handleSendReply = () => {
		if (replyText.trim()) {
			setReplyText('');
			setIsReplying(false);
		}
	};
	
	const date = "6 марта";
	const title = "Тест " + taskId;
	const message = "тут описание типа у задачи (еще файлы закрепить можно, но может нафиг такой функционал)";
	
	return (
		<div className="panel p-4">
			<div className="flex items-center mb-4">
				<button className={"mr-2"}>❌</button>
				<input type={"checkbox"} className="w-4 h-4 mr-8"/>
				<div className="text-red-500 text-sm">7 дней назад, {date}</div>
			</div>
			
			<input type={"text"} className={"text-xl font-bold mb-2"} value={title}/>
			
			{/* Message Content */}
			<p className="text-gray-300 mb-4">{message}</p>
			
			{/* Reply Section */}
			{!isReplying ? (
				<button
					onClick={handleReplyClick}
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
						onClick={handleSendReply}
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
	);
};

export default PropertyEditor;