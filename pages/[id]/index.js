import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { server } from '../../utils/config';

const News = ({ news }) => {
	const [confirm, setConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const deleteNews = async () => {
		const newsId = router.query.id;
		try {
			const deleted = await fetch(`${server}/api/news/${newsId}`, {
				method: 'Delete',
			});

			// router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
	};

	return (
		<div>
			<>
				<h1>{news.embed}</h1>
				<p>{note.content}</p>
				<br />
				<Button color='red'>Delete</Button>
			</>
		</div>
	);
};

News.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`${server}/api/news/${id}`);
	const { data } = await res.json();

	return { news: data };
};

export default News;
