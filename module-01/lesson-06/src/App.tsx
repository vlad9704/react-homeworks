import {useRef, useState} from 'react';
import type { ChangeEvent } from 'react';

function App() {
	const [controlledValue, setControlledValue] = useState('');
	const [controlledFilter, setControlledFilter] = useState('');
	const [uncontrolledFilter, setUncontrolledFilter] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	// Управляемый фильтр
	const handleControlledSearch = () => {
		setControlledFilter(controlledValue);
	};

	const onChangeControlledValue = (e: ChangeEvent<HTMLInputElement>) => {
		setControlledValue(e.target.value);
	};

	const resetControlled = () => {
		setControlledValue('');
	};

	// Неуправляемый фильтр
	const handleUncontrolledSearch = () => {
		setUncontrolledFilter(inputRef.current?.value ?? '');
	};

	const resetUncontrolled = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		setUncontrolledFilter('');
	};

	return (
		<div>
			<h2>Управляемый фильтр</h2>

			<input
				type='text'
				value={controlledValue}
				onChange={onChangeControlledValue}
				placeholder='Поиск...'
			/>

			<button onClick={handleControlledSearch}>
				Найти
			</button>

			<button onClick={resetControlled}>
				Сбросить
			</button>

			<p>Фильтр: {controlledFilter}</p>

			<hr/>

			<h2>Неуправляемый фильтр</h2>

			<input
				type='text'
				defaultValue=''
				ref={inputRef}
				placeholder='Поиск...'
			/>

			<button onClick={handleUncontrolledSearch}>
				Найти
			</button>

			<button onClick={resetUncontrolled}>
				Сбросить
			</button>

			<p>Фильтр: {uncontrolledFilter}</p>
		</div>
	);
}

export default App;