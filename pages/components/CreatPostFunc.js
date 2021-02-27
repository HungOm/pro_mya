import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Container } from 'reactstrap';
import { useState, useEffect, Component } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// const Editor = dynamic(() => import('react-draft-wysiwyg'), { ssr: false });
// const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor));
const Editor = dynamic(
	() => {
		return import('react-draft-wysiwyg').then((mod) => mod.Editor);
	},
	{ loading: () => null, ssr: false }
);

import draftToHtml from 'draftjs-to-html';
import 'react-quill/dist/quill.snow.css';

export default class CreatPostFunc extends Component {
	state = {
		editorState: EditorState.createEmpty(),
	};

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;
		console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		return (
			<Container>
				<Editor
					editorState={editorState}
					toolbarClassName='toolbarClassName'
					wrapperClassName='wrapperClassName'
					editorClassName='editorClassName'
					onEditorStateChange={this.onEditorStateChange}
				/>
				<textarea
					disabled
					value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
			</Container>
		);
	}
}

// function uploadImageCallBack(file) {
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
// 		xhr.open('POST', 'https://api.imgur.com/3/image');
// 		xhr.setRequestHeader('Authorization', 'Client-ID 0214c9c355ff2ca');
// 		const data = new FormData();
// 		data.append('image', file);
// 		xhr.send(data);
// 		xhr.addEventListener('load', () => {
// 			const response = JSON.parse(xhr.responseText);
// 			console.log('response', response);
// 			resolve(response);
// 		});
// 		xhr.addEventListener('error', () => {
// 			const error = JSON.parse(xhr.responseText);
// 			console.log('error', error);
// 			reject(error);
// 		});
// 	});
// }

// const CreatePostFunc = () => {
// 	const [editorState, setEditorState] = useState(EditorState.createEmpty());
// 	console.log('editor', editorState);
// 	// console.log('editorState', stateToHTML(convertToRaw(editorState.getCurrentContent())));
// 	const onEditorStateChange = (editorState) => {
// 		setEditorState(editorState);
// 	};

// 	return (
// 		<Container className='editor'>
// 			<Editor
// 				editorState={editorState}
// 				onEditorStateChange={onEditorStateChange}
// 				toolbar={{
// 					inline: { inDropdown: true },
// 					list: { inDropdown: true },
// 					textAlign: { inDropdown: true },
// 					link: { inDropdown: true },
// 					history: { inDropdown: true },
// image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
// 				}}
// 			/>
// 		</Container>
// 	);
// };

// export default CreatePostFunc;
