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
}

const courses: Course[] = [
	{id: 'react', title: 'React-интерфейсы', category: 'frontend', seats: 12, version: 1},
	{id: 'typescript', title: 'Типизация данных', category: 'frontend', seats: 0, version: 1},
	{id: 'next', title: 'Серверный rendering', category: 'fullstack', seats: 8, version: 1},
	{id: 'testing', title: 'Проверка поведения UI', category: 'quality', seats: 5, version: 1},
]

const categories = [...new Set(courses.map((course) => course.category))]

const CourseListView = ({items}: CourseListViewProps) => (
	<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
		{items.map((item) => (
			<div key={item.id}>
				<h3>{item.title}</h3>
				<p>{item.category}</p>
			</div>
		))}
	</div>
)

function App() {
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState('')

	const normalizedSearch = search.trim().toLowerCase()

	const filteredCourses = courses.filter((course) => {
		const matchesTitle = course.title.toLowerCase().includes(normalizedSearch)
		const matchesCategory = category === '' || course.category === category
		return matchesTitle && matchesCategory
	})

	const resetFilters = () => {
		setSearch('')
		setCategory('')
	}

	return (
		<main>
			<div>
				<div>
					<label htmlFor="course-search">Поиск по названию: </label>
					<input
						id="course-search"
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Например, React"
					/>
				</div>
				<br/>
				<div>
					<label htmlFor="course-category"> Категория: </label>
					<select
						id="course-category"
						value={category}
						onChange={(event) => setCategory(event.target.value)}
					>
						<option value="">Все категории</option>
						{categories.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<br/>
				<button type="button" onClick={resetFilters}>
					Сбросить фильтры
				</button>
			</div>

			<br/>
			<p aria-live="polite">Найдено курсов: {filteredCourses.length}</p>
			{filteredCourses.length > 0 ? (
				<CourseListView items={filteredCourses}/>
			) : (
				<p>Совпадений не найдено</p>
			)}
		</main>
	)
}

export default App