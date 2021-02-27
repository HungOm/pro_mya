import Head from 'next/head';
import Layout from './components/Layouts';
import { server } from '../utils/config';
import { useState, useEffect } from 'react';

export default function Home() {
	const [news, setNews] = useState('');

	useEffect(() => {
		async function loadData() {
			const res = await fetch(`${server}/api/news`);
			const { data } = await res.json();
			setNews(data);
		}
		loadData();
	}, []);
	console.log('news', news);
	// console.log('users', users);
	return (
		<div>
			<Head>
				<title>MYA | Myanmar Youth Activisms</title>
				<link rel='icon' href='/favicon.ico' />
				<h1>test</h1>
			</Head>
			<Layout />
		</div>
	);
}

// const Home = ({ users }) => {
// 	console.log('users', users);
// 	return (
// 		<div>
// 			<Head>
// 				<title>MYA | Myanmar Youth Activisms</title>
// 				<link rel='icon' href='/favicon.ico' />
// 			</Head>
// 			<Layout />
// 		</div>
// 	);
// };

// Home.getInitialProps = async () => {
// 	const res = await fetch(`${server}/api/news`);
// 	const { data } = await res.json();

// 	return { users: data };
// };

// export default Home;
