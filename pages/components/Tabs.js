import React from 'react';

const Tabs = ({ list, curTab, onChange }) => {
	return (
		<div className='w-11/12 md:w-5/12 m-auto divide-x-2 divide-black border-2 border-black'>
			{React.Children.toArray(
				list.map((tabS) => (
					<button
						className={`tab-button ${curTab === tabS && 'active'}`}
						style={{ width: `${100 / list.length}%` }}
						onClick={() => onChange(tabS)}>
						{tabS}
					</button>
				))
			)}
		</div>
	);
};

export default Tabs;
