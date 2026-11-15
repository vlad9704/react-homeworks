import {useState} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Panel from './Panel.jsx'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<Panel
				title="React для начинающих"
				actions={<button type="button">Записаться</button>}
			>
				<p>Курс по изучению React</p>
			</Panel>
			<Panel
				title="Полный курс по разработке веб-приложений на Python с изучением современных технологий и инструментов"
				actions={<button type="button">Записаться</button>}
			>
				<p>Курс по изучению Python</p>
			</Panel>
			<Panel
				title="Фильтр курсов"
				actions={<button type="button">Сбросить фильтры</button>}
			>
				<input type="search" placeholder="Поиск курса"/>

				<select defaultValue="all">
					<option value="all">Все уровни</option>
					<option value="beginner">Начинающий</option>
					<option value="advanced">Продвинутый</option>
				</select>
			</Panel>
			<Panel title="Курс JavaScript">
				<p>Курс по изучению JavaScript</p>
			</Panel>
		</div>
	)
}

export default App
