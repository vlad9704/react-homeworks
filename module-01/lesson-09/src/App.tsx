import {useState, useMemo} from 'react'
import './App.css'

type Course = {
	id: number
	title: string
	category: string
	seats: number
	version: number
}

type CourseListViewProps = {
	items: Course[]
}

const courses: Omit<Course, 'id'>[] = [
	{title: 'React-интерфейсы', category: 'frontend', seats: 12, version: 1},
	{title: 'Типизация данных', category: 'frontend', seats: 0, version: 1},
	{title: 'Серверный rendering', category: 'fullstack', seats: 8, version: 1},
	{title: 'Проверка поведения UI', category: 'quality', seats: 5, version: 1}
]

const largeCourses: Course[] = Array.from({length: 2000}, (_, index) => {
	const course = courses[index % courses.length]

	return {
		...course,
		id: index + 1,
	}
})

const CourseListView = ({items}: CourseListViewProps) => (
	<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
		{items.map((item) => (
			<div key={item.id}>
				<h5>{item.id}. {item.title}</h5>
				<p>{item.category}</p>
			</div>
		))}
	</div>
)

// Сортировка с useMemo
const WithMemo = ({direction}: { direction: string }) => {
	const sortedCourses = useMemo(() => {
		console.count('Сортировка с useMemo')

		return [...largeCourses].sort((a, b) => {
			return direction === 'asc'
				? a.id - b.id
				: b.id - a.id
		})
	}, [direction])

	return <CourseListView items={sortedCourses}/>
}

// Сортировка без useMemo
const WithoutMemo = ({direction}: { direction: string }) => {
	console.count('Сортировка без useMemo')

	const sortedCourses = [...largeCourses].sort((a, b) => {
		return direction === 'asc'
			? a.id - b.id
			: b.id - a.id
	})

	return <CourseListView items={sortedCourses}/>
}

function App() {
	const [sortDirection, setSortDirection] = useState('asc')
	const [counter, setCounter] = useState(0)
	const [sortType, setSortType] = useState('withMemo')

	return (
		<>
			<div>
				<p>Counter: {counter}</p>
				<button onClick={() => setCounter(prev => prev + 1)}>
					Increase
				</button>
			</div>

			<br/>

			<div>
				<select
					value={sortType}
					onChange={(e) => setSortType(e.target.value)}
				>
					<option value="withMemo">С useMemo</option>
					<option value="withoutMemo">Без useMemo</option>
				</select>

				<select
					value={sortDirection}
					onChange={(e) => setSortDirection(e.target.value)}
				>
					<option value="asc">По возрастанию</option>
					<option value="desc">По убыванию</option>
				</select>

				{sortType === 'withMemo'
					? <WithMemo direction={sortDirection}/>
					: <WithoutMemo direction={sortDirection}/>
				}
			</div>
		</>
	)
}

export default App
