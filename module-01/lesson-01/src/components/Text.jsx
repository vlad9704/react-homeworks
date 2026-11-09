import React, {useEffect, useRef, useState} from 'react';

const Text = (props) => {
	const {
		title,
	} = props

	const [text, setText] = useState('Some text')

	console.log('Text rendered')

	const someText = useRef(null)

	useEffect(() => {
		console.log('Observer enabled');

		const observer = new MutationObserver((mutations) => {
			console.log(mutations);
		});

		observer.observe(someText.current, {
			childList: true,
			subtree: true,
			characterData: true
		})

		return () => {
			console.log('Observer disabled');
			observer.disconnect()
		};
	}, []);

	const changeText = () => {
		const target = someText.current.querySelector('.target-text')
		target.textContent = 'New text'
	}

	return (
		<div ref={someText}>
			<div>
				<h2>{text}</h2>
				<input
					type="text"
					onInput={(e) => setText(e.currentTarget.value.trim() || 'Some text')}
				/>
			</div>
			<div>-------------------------------------</div>
			<div>
				<div className='target-text'>Some text</div>
				<button onClick={changeText}>Change text</button>
			</div>
			<div>-------------------------------------</div>
			<div>
				<h2>{title}</h2>
			</div>
		</div>
	);
};

export default Text;