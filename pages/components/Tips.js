import React from 'react'

const Tips = ({ TipsList, setTipsList, tipData, setTipData }) => {

    const [author, setAuthor] = React.useState('')
    const [source, setSource] = React.useState('')

    function emptyPreview(e) {
        if (e) e.preventDefault()

        setTipData(null)
        setAuthor('')
        setSource('')
    }

    function handleOnSubmit(e) {
        e.preventDefault()

        setTipsList([...TipsList, {
            embbed: tipData,
            author,
            source
        }].reverse())
        emptyPreview()
    }
    const stripString = (embbed) => (embbed.substring(0, embbed.length - 0))


    function renderPreview(tipData) {
        return <div className='py-4'
            dangerouslySetInnerHTML={{ __html: stripString(tipData) }} />

    }

    function renderPreviewData(tipData) {
        return <><div className='py-4'
            dangerouslySetInnerHTML={{ __html: stripString(tipData.embbed) }} />
            <p><strong>{tipData.source}</strong>—{tipData.author}</p>
        </>

    }

    return <div className='border-2 border-black py-4 px-3'>
        <div className='rounded border-black border-2'>
            <form onSubmit={e => handleOnSubmit(e)}>
                <label >Embbed:</label>

                <input type='textarea' onPaste={e => {
                    e.preventDefault()
                    let embbed = e.clipboardData.getData('text/plain')
                    if (embbed !== '') {
                        setTipData(embbed)
                    }
                }} />

                {tipData && renderPreview(tipData)}
                <div className='flex flex-row'>
                    <div className='w-6/12'>
                        <label >author:</label>

                        <input type='textarea' value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className='w-6/12'>
                        <label >source:</label>
                        <input type='textarea' value={source} onChange={(e) => setSource(e.target.value)} required />
                    </div>
                </div>
                <button type='submit' className='px-4 py-2 bg-black text-white'>Submit</button>
            </form>
        </div>

        {React.Children.toArray(
            TipsList && TipsList.length >= 1 && TipsList.map(pre =>
                <div className='rounded border-black border-2'>
                    {renderPreviewData(pre)}
                </div>))}

    </div >


}

export default Tips