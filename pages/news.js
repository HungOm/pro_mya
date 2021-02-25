import Link from 'next/link';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useState, useEffect, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useRouter } from 'next/router';
import { render } from 'react-dom';

import {
	FormatAlignLeft as FormatAlignLeftIcon,
	FormatAlignCenter as FormatAlignCenterIcon,
	FormatAlignRight as FormatAlignRightIcon,
} from '@material-ui/icons';
import { Editor, EditorContainer, EditorToolbar, TextAlignToggleButton } from 'draft-js-wysiwyg';
import 'draft-js/dist/Draft.css';

function uploadImageCallBack(file) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://api.imgur.com/3/image');
		xhr.setRequestHeader('Authorization', 'Client-ID 0214c9c355ff2ca');
		const data = new FormData();
		data.append('image', file);
		xhr.send(data);
		xhr.addEventListener('load', () => {
			const response = JSON.parse(xhr.responseText);
			console.log(response);
			resolve(response);
		});
		xhr.addEventListener('error', () => {
			const error = JSON.parse(xhr.responseText);
			console.log(error);
			reject(error);
		});
	});
}

// return (
// 	<div className='editor'>
// 		<Editor
// 			editorState={editorState}
// 			onEditorStateChange={this.onEditorStateChange}
// 			toolbar={{
// 				inline: { inDropdown: true },
// 				list: { inDropdown: true },
// 				textAlign: { inDropdown: true },
// 				link: { inDropdown: true },
// 				history: { inDropdown: true },
// 				image: {
// 					uploadCallback: uploadImageCallBack,
// 					alt: { present: true, mandatory: false },
// 				},
// 			}}
// 		/>
// 	</div>
// );

const NewNote = () => {
	const [form, setForm] = useState({
		embed: '',
		content: [{ image: '', description: '' }],
		source: '',
	});

	// const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

	// const editor = React.useRef(null);

	// function focusEditor() {
	// 	editor.current.focus();
	// }

	// React.useEffect(() => {
	// 	focusEditor();
	// }, []);
	const [alignment, setAlignment] = useState('left');

	const handleAlignment = (_, newAlignment) => {
		setAlignment(newAlignment);
	};
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
			<EditorContainer>
				<EditorToolbar>
					<ToggleButtonGroup exclusive value={alignment} onChange={handleAlignment}>
						<TextAlignToggleButton value='left'>
							<FormatAlignLeftIcon />
						</TextAlignToggleButton>
						<TextAlignToggleButton value='center'>
							<FormatAlignCenterIcon />
						</TextAlignToggleButton>
						<TextAlignToggleButton value='right'>
							<FormatAlignRightIcon />
						</TextAlignToggleButton>
					</ToggleButtonGroup>
				</EditorToolbar>
				<Editor placeholder='Enter some text..' />
			</EditorContainer>
			{/* <h1>Create News</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for='name'>Name</Label>
					<Input
						type='text'
						name='name'
						id='name'
						placeholder='Enter name'
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
						onChange={(e) => onChangeForm(e)}
						required
					/>
				</FormGroup>
				<Button type='submit'>Create</Button>
			</Form> */}
		</Container>
	);
};

export default NewNote;
