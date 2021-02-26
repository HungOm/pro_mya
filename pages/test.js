class ReactQuillWrapper1 extends Component {
	// const [form, setForm] = useState({
	// 	embed: '',
	// 	content: [{ image: '', description: '' }],
	// 	source: '',
	// });

	// const handleChange = (e) => {
	// 	setForm({
	// 		...form,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	constructor(props) {
		super(props);
		this.state = { editorHtml: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(html) {
		this.setState({ editorHtml: html });
	}

	imageHandler() {
		const input = document.createElement('input');

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
			const formData = new FormData();

			formData.append('image', file);

			// Save current cursor state
			const range = this.quill.getSelection(true);

			// Insert temporary loading placeholder image
			this.quill.insertEmbed(
				range.index,
				'image',
				`${window.location.origin}/images/loaders/placeholder.gif`
			);

			// Move cursor to right side of image (easier to continue typing)
			this.quill.setSelection(range.index + 1);

			const res = await uploadImageCallBack(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

			// Remove placeholder image
			this.quill.deleteText(range.index, 1);

			// Insert uploaded image
			// this.quill.insertEmbed(range.index, 'image', res.body.image);
			this.quill.insertEmbed(range.index, 'image', res);
		};
	}

	handleChange(value) {
		this.setState({ text: value });
	}

	render() {
		return (
			<Container>
				{/* {JSON.stringify(this.state.editorHtml)} */}
				<hr />
				<ReactQuill
					ref={(el) => {
						this.quill = el;
					}}
					onChange={this.handleChange}
					placeholder={this.props.placeholder}
					modules={{
						toolbar: {
							container: [
								[{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
								[{ size: [] }],
								['bold', 'italic', 'underline', 'strike', 'blockquote'],
								[{ list: 'ordered' }, { list: 'bullet' }],
								['link', 'video'],
								['link', 'image', 'video'],
								['clean'],
								['code-block'],
							],
							handlers: {
								image: this.imageHandler,
							},
						},
					}}
				/>
			</Container>
		);
	}
}

class ReactQuillWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
		this.handleChange = this.handleChange.bind(this);
		(this.modules = {
			toolbar: [
				[{ header: [1, 2, false] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link', 'image'],
				['clean'],
			],
		}),
			(this.formats = [
				'header',
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'list',
				'bullet',
				'indent',
				'link',
				'image',
			]);
	}

	handleChange(value) {
		this.setState({ text: value });
	}

	render() {
		console.log(this.state.text);
		return (
			<div>
				<ReactQuill
					value={this.state.text}
					modules={this.modules}
					formats={this.formats}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
