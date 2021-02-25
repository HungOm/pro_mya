import Head from 'next/head';
import Layout from './components/Layouts';

const Home = () => {
	return (
		<div>
			<Head>
				<title>MYA | Myanmar Youth Activisms</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout />
		</div>
	);
};

// Home.getInitialProps = async () => {
// 	const res = await fetch('http://localhost:3000/api/users');
// 	const { data } = await res.json();

// 	return { users: data };
// };

export default Home;
