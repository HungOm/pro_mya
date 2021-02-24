import Head from 'next/head';
import Layout from './components/Layouts';

export default function Home() {
	return (
		<div>
			<Head>
				<title>MYA | Myanmar Youth Activisms</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout />
		</div>
	);
}
