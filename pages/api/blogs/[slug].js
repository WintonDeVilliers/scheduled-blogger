const {blogs} = require('./data.json')

export default (req, res) =>  {
    const evt = blogs.filter((ev) => ev.slug === req.query.slug)
    res.status(200).json(evt)

    if(req.method ==='GET'){
        res.status(200).json(evt)
    }else {
        res.setHeader('Allow', [GET])
        res.status(405).json({message: `Method ${req.method} is not allowed`})
    }
}