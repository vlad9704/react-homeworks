import React, {useState} from 'react';
import Text from './Text.jsx'

const Counter = () => {
	const [counter, setCounter] = useState(0)
	const [showText, setShowText] = useState(true)
	const [title, setTitle] = useState('Some title')
	console.log('Counter rendered')

	return (
		<div>
			<h2>Counter</h2>
			<p>{counter}</p>
			<button onClick={() => setCounter(counter+1)}>increment</button>
			<button onClick={() => setCounter(counter-1)}>decrement</button>
			<div>-------------------------------------</div>
			<button onClick={() => setShowText(prev => !prev)}>
				Toggle Component Text
			</button>
			{ showText && <Text title={title} /> }
			<div><button onClick={() => setTitle('New title')}>Change title</button></div>
		</div>
	);
};

export default Counter;