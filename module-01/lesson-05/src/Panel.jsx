import React from 'react';

const Panel = (props) => {
	const {
		title,
		children,
		actions
	} = props
	
	return (
		<div className="panel">
			<a
				href="#"
				className="panel-title"
				title={title}
			>
				{title}
			</a>
			<div>{children}</div>
			{actions && (
				<div>
					{actions}
				</div>
			)}
		</div>
	);
};

export default Panel;