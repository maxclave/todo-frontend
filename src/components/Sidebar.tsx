import React from 'react';
import {WindowType} from "../types/windowEnum.ts";
import { clsx } from 'clsx';

interface SidebarProps {
	onWindowSwitch: (windowName: WindowType) => void;
	activeWindow: WindowType;
}

const Sidebar: React.FC<SidebarProps> = ({onWindowSwitch, activeWindow}) => {
	return (
		<div className="w-[50px] h-screen bg-[#242424] text-white flex flex-col items-center gap-6">
			<div
				className= "w-8 h-8 flex-none cursor-pointer mt-4"
				onClick={() => onWindowSwitch(WindowType.Profile)}>
				<img
					src="/assets/user-profile.png"
					className={clsx("rounded-2xl", activeWindow === WindowType.Profile && "border-2 border-b-white")}
					title="Profile"
					alt="Profile"/>
			</div>
			<div
				className="w-6 h-6 flex-none cursor-pointer"
				onClick={() => onWindowSwitch(WindowType.Tasks)}>
				<img
					src={`/assets/${activeWindow === WindowType.Tasks ? 'task-selected' : 'task-unselected'}.png`}
					title="Tasks"
					alt="Tasks"/>
			</div>
			<div
				className="w-6 h-6 flex-none cursor-pointer"
				onClick={() => onWindowSwitch(WindowType.Pomodoro)}>
				<img
					src={`/assets/${activeWindow === WindowType.Pomodoro ? 'pomodoro-selected' : 'pomodoro-unselected'}.png`}
					title="Pomodoro"
					alt="Pomodoro"/>
			</div>
		</div>
	);
};

export default Sidebar;