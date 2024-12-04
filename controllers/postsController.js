const postsData = require("../data/posts")

const index = (req, res) => {
    const queryString = req.query;
    let postsToSend = postsData;
    
    if(queryString.tags !== undefined) {
        postsToSend = postsData.filter((curPost) => curPost.tags.includes(queryString.tags))
    };

    res.json({
        post: postsToSend,
        lunghezza: postsToSend.length,
    });
};

const show = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsData.find((curPost) => curPost.id === postId);
    
    if(post) {
       res.json(post); 
    } else {
        res.status(404).json("Errore 404. Post non trovato!")
    }
};

const create = (req, res) => {
    res.json("Creo un nuovo elemento!");
};

const update = (req, res) => {
    const postId = req.params.id;
    res.json("Modifico i dati dell'elemento " + postId);
};

const modify = (req, res) => {
    const postId = req.params.id;
    res.json("Modifico alcuni dati dell'elemento " + postId);
};

const destroy = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = postsData.findIndex((curPost) => curPost.id === postId);

    if(postIndex === -1) {
        res.statusCode = 404
        res.json({
            error: true,
            message: "Post non trovato"
        })
    } else {
        postsData.splice(postIndex, 1);
        res.sendStatus(204);
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy,
}