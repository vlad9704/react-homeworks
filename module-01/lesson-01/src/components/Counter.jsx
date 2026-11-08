import React, {useState} from 'react';
import Text from './Text.jsx'

const Counter = () => {
	const [counter, setCounter] = useState(0)
	const [title, setTitle] = useState('Some title')
	console.log('Counter rendered')

	return (
		<div>
			<h2>Counter</h2>
			<p>{counter}</p>
			<button onClick={() => setCounter(counter+1)}>increment</button>
			<button onClick={() => setCounter(counter-1)}>decrement</button>
			<div>-------------------------------------</div>
			<Text
				title={title}
			/>
			<button onClick={() => setTitle('New title')}>Change title</button>
		</div>
	);
};

export default Counter;