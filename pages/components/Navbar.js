import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = React.useState(false);

	// React.useEffect(() => {
	//     setTimeout(function () { setIsScrolled(true) }, 3000)
	// }, [])

	return (
		<nav className='text-center p-5 border-black border-b-2'>
			<Link href='/'>
				<h1 style={{ fontSize: !isScrolled ? '63vh' : '4rem', transition: '0.8s' }}>MYA</h1>
			</Link>
		</nav>
	);
};

export default Navbar;
