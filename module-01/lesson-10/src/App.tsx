import {memo, useCallback, useMemo, useState} from 'react'
import './App.css'

interface Course {
	id: string
	title: string
	category: string
	seats: number
	version: number
}

interface CourseListViewProps {
	items: Course[]
	onSelect: (id: string) => void
}

const CourseListView = memo(({items, onSelect}: CourseListViewProps) => {
	console.log('CourseListView render')

	return (
		<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
			{items.map((item) => (
				<div key={item.id}>
					<h3>{item.title}</h3>
					<p>{item.category}</p>
					<button onClick={() => onSelect(item.id)}>Выбрать</button>
				</div>
			))}
		</div>
	)
})

function App() {
	const [count, setCount] = useState(0)
	const [selectedIds, setSelectedIds] = useState<string[]>([])

	const courses = useMemo<Course[]>(() => [
		{id: 'react', title: 'React-интерфейсы', category: 'frontend', seats: 12, version: 1},
		{id: 'typescript', title: 'Типизация данных', category: 'frontend', seats: 0, version: 1},
		{id: 'next', title: 'Серверный rendering', category: 'fullstack', seats: 8, version: 1},
		{id: 'testing', title: 'Проверка поведения UI', category: 'quality', seats: 5, version: 1},
	], [])

	const handleSelect = useCallback((id: string) => {
		setSelectedIds(prev =>
			prev.includes(id) ? prev : [...prev, id]
		)
	}, [])

	const resetSelectedIds = () => {
		setSelectedIds([])
	}

	return (
		<>
			<div>
				<p>Counter: {count}</p>
				<button onClick={() => setCount(count + 1)}>Increase</button>
			</div>

			<p>Выбранные курсы:</p>
			{selectedIds.length > 0 && (
				<ul>
					{selectedIds.map((id) => (
						<li key={id}>{id}</li>
					))}
				</ul>
			)}

			<CourseListView
				items={courses}
				onSelect={handleSelect}
			/>

			<br/>

			<div>
				<button onClick={resetSelectedIds}>Сброс выбранных курсов</button>
			</div>
		</>
	)
}

export default App
