import Link from 'next/link';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useState, useEffect, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useRouter } from 'next/router';
import { render } from 'react-dom';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const Editor = dynamic(() => import('react-draft-wysiwyg'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

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
			resolve(response);
		});
		xhr.addEventListener('error', () => {
			const error = JSON.parse(xhr.responseText);
			reject(error);
		});
	});
}

class EditorContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		};
	}

	onEditorStateChange = (editorState) => {
		// console.log(editorState)
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;
		return (
			<div className='editor'>
				<Editor
					editorState={editorState}
					onEditorStateChange={this.onEditorStateChange}
					toolbar={{
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						image: {
							uploadCallback: uploadImageCallBack,
							alt: { present: true, mandatory: false },
						},
					}}
				/>
			</div>
		);
	}
}

const NewNote = () => (
	<div>
		<h2>Test with React Draft Wysiwyg.</h2>
		<EditorContainer />
	</div>
);

export default NewNote;
