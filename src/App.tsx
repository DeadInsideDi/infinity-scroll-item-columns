import s from './App.module.scss'
import { LeftPanel, RightPanel } from './components/Panels'

function App() {
	return (
		<>
			<header className={s.header}>
				<div>
					<h1>Тестовое задание на позицию fullstack</h1>
					<p>
						1,000,000 элементов с бесконечной прокруткой, фильтрацией и
						сортировкой перетаскиванием (drag-and-drop)
					</p>
				</div>
				<a href='https://matsen.vercel.app/'>
					Работа создана Матвеем Олеговичем
				</a>
			</header>

			<main className={s.main}>
				<LeftPanel />
				<RightPanel />
			</main>
		</>
	)
}

export default App
