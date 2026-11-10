import './App.css'

type Course = {
	id: string;
	title: string;
	category: string;
	seats: number;
	version: number;
};

type CourseCardProps = {
	course: Course;
};

function App() {
	const courses = [
		{"id":"react","title":"React-интерфейсы","category":"frontend","seats":12,"version":1},
		{"id":"typescript","title":"Типизация данных","category":"frontend","seats":0,"version":1},
		{"id":"next","title":"Серверный rendering","category":"fullstack","seats":8,"version":1},
		{"id":"testing","title":"Проверка поведения UI","category":"quality","seats":5,"version":1}
	]

	function CourseCard({ course }: CourseCardProps) {
		const handleClick = () => {
			localStorage.setItem('selected-course', course.id);
		}

		return (
			<div>
				<h2>{course.title}</h2>
				<h3>Категория: {course.category}</h3>
				<p>Свободные места: {course.seats}</p>
				<button
					onClick={handleClick}
					disabled={course.seats <= 0}
				>
					Выбрать
				</button>
				<div>-------------------------------------------------</div>
			</div>
		)
	}

	return (
		<div>
			<h1>Доступные курсу</h1>
			<div>-------------------------------------------------</div>
			{courses.map(course => (
				<CourseCard
					key={course.id}
					course={course}
				/>
			))}
		</div>
	)
}

export default App
