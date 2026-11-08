import React, {memo, useEffect, useRef, useState} from 'react';

const Text = (props) => {
	const {
		title,
	} = props

	const [text, setText] = useState('Some text')

	console.log('Text rendered')

	const someText = useRef(null)

	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			console.log(mutations);
		});

		observer.observe(someText.current, {
			childList: true,
			subtree: true,
			characterData: true
		})

		return () => {
			observer.disconnect()
		};
	}, []);

	const changeText = () => {
		someText.current.textContent = 'New text'
	}

	return (
		<>
			<div>
				<h2>{text}</h2>
				<input
					type="text"
					onInput={(e) => setText(e.currentTarget.value.trim() || 'Some text')}
				/>
			</div>
			<div>-------------------------------------</div>
			<div>
				<div ref={someText}>Some text</div>
				<button onClick={changeText}>Change text</button>
			</div>
			<div>-------------------------------------</div>
			<div>
				<h2>{title}</h2>
			</div>
		</>
	);
};

export default memo(Text);