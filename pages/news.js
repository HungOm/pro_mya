import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useRouter } from 'next/router';

const NewNote = () => {
	const [form, setForm] = useState({
		embed: '',
		content: [{ image: '', description: '' }],
		source: '',
	});
	const router = useRouter();

	const createNote = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/news', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			// router.push("/");
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
		<Container>
			<h1>Create News</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for='name'>Name</Label>
					<Input
						type='text'
						name='name'
						id='name'
						placeholder='Enter name'
						// value={formData.name}
						onChange={(e) => onChangeForm(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for='name'>Name</Label>
					<Input
						type='text'
						name='name'
						id='name'
						placeholder='Enter name'
						// value={formData.name}
						onChange={(e) => onChangeForm(e)}
						required
					/>
				</FormGroup>
				<Button type='submit'>Create</Button>
			</Form>
		</Container>
	);
};

export default NewNote;
