import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<head></head>
				<Head />
				<body>
					<link
						rel='stylesheet'
						href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css'
					/>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
