import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import { server } from '../../utils/config';

const EditNews = ({ news }) => {
	useEffect(() => {
		if (news) {
			setEmbed(news.embed);
			setContent(news.content);
		}
	}, [news]);

	const [embed, setEmbed] = useState();
	const [content, setContent] = useState();
	const router = useRouter();

	//TODO to add embed  to html convert to easier to edit

	const updateNote = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${server}/api/news/${router.query.id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					embed,
					content,
				}),
			});
			// console.log('res', res);
			// router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<h1>Update News</h1>
			<div>
				<Form onSubmit={updateNote}>
					<Row>
						<Col className='mb-6'>
							<FormGroup>
								<Label for='name'>Embed Link: </Label>
								<Input
									type='text'
									name='embed'
									id='embed'
									placeholder=' Paste embed'
									value={embed}
									onChange={(e) => setEmbed(e.target.value)}
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
									value={content}
									onChange={(e) => setContent(e.target.value)}
								/>
							</FormGroup>
						</Col>
						<Col>
							<input
								type='submit'
								style={{ background: '#17a2b8', color: '#fff' }}
								className='btn btn-custom mt-5 p-1 rounded'
								value='Update '
							/>
						</Col>
					</Row>
				</Form>
			</div>
		</Container>
	);
};

EditNews.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`${server}/api/news/${id}`);
	const { data } = await res.json();

	return { news: data };
};

export default EditNews;
