const pagesController = {}

pagesController.renderIndex = (req, res) => {
    res.render('index');
}

module.exports = pagesController;