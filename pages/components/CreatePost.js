import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { Container } from 'reactstrap';

async function apiPostNewsImage(file) {
	var image = JSON.stringify(file);

	const data = await axios.post(
		'https://script.google.com/macros/s/AKfycbyzdq2XL_YeF2ft3T4talJ--ksp8i-Heck_Z_a9QFnnc9H59ON47ilkOA/exec',
		image
	);
	console.log('data', data);
}

class CreatePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorHtml: '',
			embedURL: '',
		};
		this.this.handleChange = this.handleChange.bind(this);
	}

	handleChange(html) {
		this.setState({ editorHtml: html });
	}

	render() {
		return (
			<Container className='text-editor'>
				<ReactQuill
					ref={(el) => {
						this.quill = el;
					}}
					onChange={this.handleChange}
					placeholder={this.props.placeholder}
					modules={{
						toolbar: {
							container: [
								[{ header: '1' }, { header: '2' }, { header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
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
				{JSON.stringify(this.state.editorHtml)}
			</Container>
		);
	}
}

export default CreatePost;

// imageHandler() {
//   const input = document.createElement('input');

//   input.setAttribute('type', 'file');
//   input.setAttribute('accept', 'image/*');
//   input.click();

//   input.onchange = async () => {
//     const file = input.files[0];
//     // const formData = new FormData();

//     // formData.append('image', file);

//     // Save current cursor state
//     const range = this.quill.getSelection(true);

//     // Insert temporary loading placeholder image
//     this.quill.insertEmbed(
//       range.index,
//       'image', `${window.location.origin}/images/loaders/placeholder.gif`
//     );

//     // Move cursor to right side of image (easier to continue typing)
//     this.quill.setSelection(range.index + 1);

//     const res = await apiPostNewsImage(file); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

//     // Remove placeholder image
//     this.quill.deleteText(range.index, 1);

//     // Insert uploaded image
//     // this.quill.insertEmbed(range.index, 'image', res.body.image);
//     this.quill.insertEmbed(range.index, 'image', res);
//   };
// }
