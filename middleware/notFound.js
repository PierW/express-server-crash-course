const notFound = (req, res, next) => {
    const error = new Error('Pagina non trovata');
    error.status = 404;
    next(error);
}

export default notFound;