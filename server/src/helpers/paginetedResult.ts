export default (query: unknown) => {
    const { search: title, isCompleted, isPublic, page = 1 } = query;
    let options = {};
    if (title) {
        const regexpTitle = new RegExp(title, "i");
        options = { ...options, title: regexpTitle };
    }
    if (isCompleted) options = { ...options, isCompleted: !!isCompleted };
    if (isPublic) options = { ...options, isPublic: !!isPublic };

    const skip = (page - 1) * 5;

    return { skip, options, page };
};