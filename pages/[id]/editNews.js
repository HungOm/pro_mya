import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import { server } from '../../utils/config';

const EditNews = ({ news, match }) => {
	const [form, setForm] = useState({ embed: news.embed, content: news.content });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	console.log('news', news);
	//TODO to add embed  to html convert to easier to edit

	const updateNote = async () => {
		try {
			const res = await fetch(`${server}/api/news/${router.query.id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			// router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<h1>Update News</h1>
			<div>
				<Form onSubmit={updateNote}>
					<Row>
						<Col className='mb-6'>
							<FormGroup>
								<Label for='name'>Embed Link: </Label>
								<Input
									type='text'
									name='embedURL'
									id='embedURL'
									placeholder=' Paste embedURL'
									value={form.embed}
									onChange={(e) => handleChange}
								/>
							</FormGroup>
						</Col>
						<Col className='mb-6'>
							<FormGroup>
								<Label for='name'>Content: </Label>
								<Input
									type='textarea'
									name='content'
									id='content'
									placeholder=' Edit content'
									value={form.content}
									onChange={(e) => handleChange}
								/>
							</FormGroup>
						</Col>
						<Col>
							<Button type='submit'>Update</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

EditNews.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`${server}/api/news/${id}`);
	const { data } = await res.json();

	return { news: data };
};

export default EditNews;
