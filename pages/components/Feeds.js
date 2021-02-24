import React from 'react';
import Link from 'next/link';

const Feeds = ({ show }) => {
	const News = () => {
		const list = [
			{
				embbed:
					'<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Less time debating the properties of money, more time figuring out how to make some.</p>&mdash; Jack Butcher (@jackbutcher) <a href="https://twitter.com/jackbutcher/status/1363497157471465475?ref_src=twsrc%5Etfw">February 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
				content: '',
				source: 'www.twitter.com/213123',
				author: 'www.twitter.com/@shelomoh',
			},
			// {
			//     embbed: 'https://www.bbc.com/news/world-us-canada-56141673',
			//     content: '',
			//     source: 'www.bbc.com/somelink'
			// }
		];

		const stripString = (embbed) => embbed.substring(0, embbed.length - 0);

		return (
			<>
				{React.Children.toArray(
					list.map((news) => (
						<div className='border-2 border-black py-4 px-3'>
							<div
								className='py-4'
								dangerouslySetInnerHTML={{ __html: stripString(news.embbed) }}></div>
							<div className='flex justify-between py-4 border-t-2 border-black'>
								<div>
									<span className='mr-1 uppercase text-sm'>News:</span>
									<a href={news.source} className='text-blue-600'>
										{news.source} →
									</a>
								</div>
								<div>
									<span className='mr-1 uppercase text-sm'>Source:</span>
									<a href={news.author} className='text-blue-600'>
										{news.author} →
									</a>
								</div>
							</div>
						</div>
					))
				)}
				<div className='text-center py-5 uppercase'>- You catch up -</div>
			</>
		);
	};
	const Facts = () => {
		return <div className='border-2 border-black py-4 px-3'>Facts</div>;
	};
	const Tips = () => {
		return <div className='border-2 border-black py-4 px-3'>Tips</div>;
	};
	const HowTo = () => {
		return <div className='border-2 border-black py-4 px-3'>HowTo</div>;
	};
	const About = () => {
		return (
			<div className='border-2 border-black py-4 px-3'>
				<h1>We Are MYA</h1>
				<p>we do what's right! ah leh</p>
			</div>
		);
	};

	function renderFeeds() {
		switch (show) {
			case 'News':
				return <News />;
			case 'Facts':
				return <Facts />;
			case 'Tips':
				return <Tips />;
			case 'How-to':
				return <HowTo />;
			case 'About':
				return <About />;
			default:
				<News />;
		}
	}

	return <div className='w-11/12 md:w-5/12 m-auto'>{renderFeeds()}</div>;
};

export default Feeds;
