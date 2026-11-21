import {memo, useCallback, useMemo, useState} from 'react'
import './App.css'

interface Course {
	id: string
	title: string
	category: string
	seats: number
	version: number
}

// Custom Hook избранных курсов
function useFavorites() {
	const [ids, setIds] = useState<string[]>([])

	const toggle = useCallback((id: string) => {
		setIds(prev =>
			prev.includes(id)
				? prev.filter(item => item !== id)
				: [...prev, id]
		)
	}, [])

	const clear = useCallback(() => {
		setIds([])
	}, [])

	return {ids, toggle, clear}
}

// Список всех курсов
interface CourseListViewProps {
	items: Course[]
	favoriteIds: string[]
	onToggle: (id: string) => void
}

const CourseListView = memo(({items, favoriteIds, onToggle}: CourseListViewProps) => {
	console.log('CourseListView render')

	return (
		<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
			{items.map(item => {
				const isFavorite = favoriteIds.includes(item.id)

				return (
					<div key={item.id}>
						<h3>{item.title}</h3>
						<p>{item.category}</p>

						<button onClick={() => onToggle(item.id)}>
							{isFavorite ? 'Убрать из избранного' : 'В избранное'}
						</button>
					</div>
				)
			})}
		</div>
	)
})

// Панель избранных курсов
interface FavoritesPanelProps {
	ids: string[]
	courses: Course[]
	onClear: () => void
}

const FavoritesPanel = memo(({ids, courses, onClear}: FavoritesPanelProps) => {
	console.log('FavoritesPanel render')

	const favoriteCourses = courses.filter(course =>
		ids.includes(course.id)
	)

	return (
		<div>
			<h2>Избранные курсы ({ids.length})</h2>

			{favoriteCourses.length > 0 ? (
				<ul>
					{favoriteCourses.map(course => (
						<li key={course.id}>{course.title}</li>
					))}
				</ul>
			) : (
				<p>Нет избранных курсов</p>
			)}

			{ids.length > 0 && (
				<button onClick={onClear}>
					Очистить избранное
				</button>
			)}
		</div>
	)
})

function App() {
	const [count, setCount] = useState(0)

	// Один экземпляр состояния избранного для обоих компонентов
	const {ids, toggle, clear} = useFavorites()

	const courses = useMemo<Course[]>(() => [
		{id: 'react', title: 'React-интерфейсы', category: 'frontend', seats: 12, version: 1},
		{id: 'typescript', title: 'Типизация данных', category: 'frontend', seats: 0, version: 1},
		{id: 'next', title: 'Серверный rendering', category: 'fullstack', seats: 8, version: 1},
		{id: 'testing', title: 'Проверка поведения UI', category: 'quality', seats: 5, version: 1},
	], [])

	return (
		<>
			<div>
				<p>Counter: {count}</p>
				<button onClick={() => setCount(count + 1)}>
					Increase
				</button>
			</div>

			<hr style={{width: '100%'}}/>

			<FavoritesPanel
				ids={ids}
				courses={courses}
				onClear={clear}
			/>

			<hr style={{width: '100%'}}/>

			<h2>Все курсы</h2>

			<CourseListView
				items={courses}
				favoriteIds={ids}
				onToggle={toggle}
			/>
		</>
	)
}

export default App
