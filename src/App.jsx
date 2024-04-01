import Style from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueVaild = value.length >= 3 ? true : false;

	const id = Date.now();

	const date = new Date();
	const resultDate =
		date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}) +
		' ' +
		date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		
	const updatedList = [...list, { id, value, resultDate }];

	const onInputButtonClick = () => {
		const promptValue = prompt();

		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Cтрока содержит менее 3 символов');
		}
	};

	const onAddButtonClick = () => {
		if (value) {
			setList(value);
			setValue('');
			setError('');
			setList(updatedList);
		}
	};

	return (
		<div className={Style.app}>
			<h1 className={Style.pageHeading}>Ввод значения</h1>
			<p className={Style.noMarginText}>
				Текущее значение <code>{value}</code>:
				<output className={Style.currentValue}></output>
			</p>
			{error !== '' && <div className={Style.error}>{error}</div>}
			<div className={Style.buttonsContainer}>
				<button className={Style.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={Style.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={Style.listContainer}>
				<h2 className={Style.listHeading}>Список:</h2>
				{list.length < 0 ? (
					<p className={Style.noMarginText}>Нет добавленных элементов</p>
				) : (
					<ul className={Style.list}>
						{list.map(({ id, value, resultDate }) => (
							<li className={Style.listItem} key={id}>
								{`${value}, дата заполнения: ${resultDate}`}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
