import {useState} from 'react'
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
	emptyText: string
	onSelect: (id: string) => void
}

const courses = [
	{"id":"react","title":"React-интерфейсы","category":"frontend","seats":12,"version":1},
	{"id":"typescript","title":"Типизация данных","category":"frontend","seats":0,"version":1},
	{"id":"next","title":"Серверный rendering","category":"fullstack","seats":8,"version":1},
	{"id":"testing","title":"Проверка поведения UI","category":"quality","seats":5,"version":1}
]

const CourseListView = ({items, emptyText, onSelect}: CourseListViewProps)  => {
	if(items.length === 0) return <p>{emptyText}</p>

	return (
		<div>
			{items.map((item) => (
				<div key={item.id} style={{display: "flex", justifyContent: "center", alignItems: "center", columnGap: "10px"}}>
					<h3>{item.title}</h3>
					<button onClick={() => onSelect(item.id)}>Выбрать</button>
				</div>
			))}
		</div>
	)
}

function App() {
	const [query, setQuery] = useState('')
	const [selectedId, setSelectedId] = useState<string | null>(null)

	const filtered = courses.filter((c) =>
		c.title.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<>
			<h2>Представление с фильтрацией и выбором курса:</h2>
			<input placeholder="Поиск..." value={query} onChange={(e) => setQuery(e.target.value)} />
			<CourseListView items={filtered} emptyText="Ничего не найдено" onSelect={setSelectedId} />
			<p>Выбран: {selectedId}</p>
			------------------------------------------------------------------------------------

			<h2>Представление с данными:</h2>
			<CourseListView items={courses} emptyText="Пусто" onSelect={console.log} />
			-------------------------------------------------------------------------------------
			<h2>Без данных:</h2>
			<CourseListView items={[]} emptyText="Курсов нет" onSelect={console.log} />
		</>
	)
}

export default App
