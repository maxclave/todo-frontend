import React from "react";

const Filters: React.FC = () => {
	return (
		<div className="w-64 panel p-4 flex flex-col space-y-10">
			<section className="space-y-4">
				<div className="flex items-center space-x-2">
					<span className="text-yellow-400">📅</span>
					<span>Сегодня</span>
					<span className="ml-auto bg-gray-600 px-2 rounded">3</span>
				</div>
				
				<div className="flex items-center space-x-2">
					<span className="text-blue-400">📆</span>
					<span>Следующие 7 дней</span>
					<span className="ml-auto bg-gray-600 px-2 rounded">3</span>
				</div>
				
				<div className="flex items-center space-x-2">
					<span className="text-gray-400">📥</span>
					<span>Входящие</span>
				</div>
			</section>
			
			<div className="flex items-center space-x-2">
				<span className="text-gray-400">🏷️</span>
				<span>Метки</span>
			</div>
			
			<div className="flex items-center space-x-2">
				<span className="text-gray-400">✅</span>
				<span>Выполнено</span>
			</div>
			
			<div className="flex items-center space-x-2">
				<span className="text-gray-400">🛒</span>
				<span>Корзина</span>
			</div>
		</div>
	)
		;
};

export default Filters;