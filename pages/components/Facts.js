import React from 'react'
import { getLinkPreview, } from 'link-preview-js'

const Facts = () => {

    let list = [{ link: 'https://www.bbc.com/news/world-africa-56180161' }]

    const [dataList, setDataList] = React.useState([])
    const [previewData, setPreviewData] = React.useState(null)

    async function getAndSetPreview(link) {
        await getLinkPreview(link).then((data) => setPreviewData(data))
    }

    function validURL(str) {
        if (str === '') return false
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
        return !!pattern.test(str)
    }

    function emptyPreview(e) {
        if (e) e.preventDefault()

        setPreviewData(null)

    }

    function handleOnSubmit(e) {
        e.preventDefault()

        setDataList([...dataList, previewData].reverse())
        emptyPreview()
    }

    function renderPreview(previewData) {
        return <div>
            {previewData.favicons?.length >= 1 && <img src={previewData.favicons[0]} />}
            {previewData.images?.length >= 1 && <img src={previewData.images[0]} />}
            <h1>{previewData.title}</h1>
            <p>{previewData.description}</p>
            <p className='text-center'><strong>{previewData.siteName}</strong></p>
            <p>Source: {previewData.url}</p>
        </div>

    }

    return <div className='border-2 border-black py-4 px-3'>
        <div className='rounded border-black border-2'>
            <form onSubmit={e => handleOnSubmit(e)}>
                <input type='textarea' onPaste={e => {
                    e.preventDefault()
                    let inputURl = e.clipboardData.getData('text/plain')
                    if (validURL(inputURl)) {
                        getAndSetPreview(e.clipboardData.getData('text/plain'))
                    }
                }} />

                {previewData && renderPreview(previewData)}
                <button type='submit' className='px-4 py-2 bg-black text-white'>Submit</button>
            </form>
        </div>

        {React.Children.toArray(
            dataList && dataList.length >= 1 && dataList.map(pre =>
                <div className='rounded border-black border-2'>
                    {renderPreview(pre)}
                </div>))}

    </div >

}

export default Facts