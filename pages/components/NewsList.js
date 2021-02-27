import { server } from '../../utils/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsList() {
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
			<h1>Test listing news</h1>
			{news &&
				news.map((e) => {
					return (
						<div>
							<Link href={`/${e._id}/editNews`}>
								<a>{e.embed}</a>
							</Link>
						</div>
					);
				})}
		</div>
	);
}
