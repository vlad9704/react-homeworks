import {useState, useTransition} from 'react';
import {Results} from './Results.jsx';

// Собственная лабораторная: оба режима используют один и тот же Results и нагрузку.
export default function OwnTransitionSearch() {
	const [mode, setMode] = useState('normal');
	const [iterations, setIterations] = useState(80000);
	const [text, setText] = useState('');
	const [listQuery, setListQuery] = useState('');
	const [isPending, startTransition] = useTransition();

	function onSearch(event) {
		const next = event.target.value;
		setText(next); // Срочное обновление: input всегда следует за вводом.
		if(mode === 'transition') {
			startTransition(() => setListQuery(next)); // Несрочное обновление списка.
		}
		else {
			setListQuery(next); // Обычный режим: оба обновления срочные.
		}
	}

	function reset() {
		setText('');
		setListQuery('');
	}

	function changeMode(event) {
		setMode(event.target.value);
		reset();
	}

	return (
		<main>
			<h1>Моя лабораторная: обычное обновление и useTransition</h1>
			<p>Сравнение при одинаковом количестве карточек и итераций на карточку.</p>
			<div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
				<label>Режим
					<select value={mode} onChange={changeMode}>
						<option value="normal">Обычный</option>
						<option value="transition">useTransition</option>
					</select>
				</label>
				<label>Итераций на карточку
					<select value={iterations} onChange={(e) => setIterations(Number(e.target.value))}>
						<option value={0}>0</option>
						<option value={80000}>80 000</option>
						<option value={320000}>320 000</option>
					</select>
				</label>
				<button type="button" onClick={reset}>Очистить</button>
			</div>
			<p><label>Поиск курса
				<input type="search" value={text} onChange={onSearch} placeholder="React / неизвестный запрос"/>
			</label></p>
			<p>Текст input: «{text}»</p>
			<p role="status">{isPending && mode === 'transition' ? 'Список обновляется…' : 'Нет ожидающего transition'}</p>
			<div aria-busy={isPending && mode === 'transition'}
			     style={{opacity: isPending && mode === 'transition' ? 0.65 : 1}}>
				<Results query={listQuery} iterations={iterations}/>
			</div>
		</main>
	);
}
