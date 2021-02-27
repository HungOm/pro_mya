import React from 'react';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../node_modules/react-quill/dist/quill.snow.css';
import { Form, FormGroup, Label, Input, Col, Container, Button, Row } from 'reactstrap';
import { server } from '../utils/config';

const CreatePost = () => {
	const [editorHtml, setEditorHtml] = useState('');
	const [embedURL, setEmbedURL] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log('test');
		try {
			const res = await fetch(`${server}/api/news`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ embed: embedURL, content: editorHtml }),
			});
			console.log('res', res);
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container
			style={{ maxWidth: '80%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
			<Row>
				<Col>
					<Form onSubmit={onSubmit}>
						<div className='mt-5 mb-5 text-center'>
							<h1>Create News Post</h1>
						</div>
						<Col className='mb-6'>
							<FormGroup>
								<Label for='name'>Embed Link: </Label>
								<Input
									type='text'
									name='embedURL'
									id='embedURL'
									placeholder=' Paste embedURL'
									value={embedURL}
									onChange={(e) => setEmbedURL(e.target.value)}
								/>
							</FormGroup>
						</Col>
						{/* ref={(el) => {this.quill = el}} */}
						<ReactQuill
							onChange={(e) => setEditorHtml(e)}
							// placeholder={this.props.placeholder}
							modules={{
								toolbar: {
									container: [
										[
											{ header: '1' },
											{ header: '2' },
											{ header: [1, 2, 3, 4, 5, 6] },
											{ font: [] },
										],
										[{ size: [] }],
										['bold', 'italic', 'underline', 'strike', 'blockquote'],
										[{ list: 'ordered' }, { list: 'bullet' }],
										['link', 'video'],
										['link', 'image', 'video'],
										['clean'],
										['code-block'],
									],
									// handlers: {
									// 	image: this.imageHandler,
									// },
								},
							}}
						/>
						<input
							type='submit'
							style={{ background: '#17a2b8', color: '#fff' }}
							className='btn btn-custom mt-5 p-1 rounded'
							value='Upload'
						/>
					</Form>
				</Col>
				<Col>{JSON.stringify(editorHtml)}</Col>
			</Row>
		</Container>
	);
};

export default CreatePost;

// async function apiPostNewsImage(file) {
// 	var image = JSON.stringify(file);

// 	const data = await axios.post(
// 		'https://script.google.com/macros/s/AKfycbyzdq2XL_YeF2ft3T4talJ--ksp8i-Heck_Z_a9QFnnc9H59ON47ilkOA/exec',
// 		image
// 	);
// 	console.log('data', data);
// }
