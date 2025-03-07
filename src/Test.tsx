import {useEffect, useState} from 'react';
import axios from 'axios';
import './css/styles.css';

function App() {
	const [message, setMessage] = useState('Loading...');
	const [count, setCount] = useState(0);
	
	useEffect(() => {
		// Отправляем GET-запрос к бэкенду
		axios.get('/api/hello')
			.then(response => {
				setMessage(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				setMessage('Failed to fetch data');
			});
	}, []);
	
	/*const getHello = async () =>{
	
	}
	*/
	return (
		<>
			<p>{message}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<h1 className="d">
				Привет мир!
			</h1>
			<p>Count: {count}</p>
		</>
	);
}

export default App;