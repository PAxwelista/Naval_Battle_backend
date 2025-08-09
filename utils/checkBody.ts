export const checkBody = (body : Record<string, unknown>, elmtToTest:string[]) => {
    for (const elmt of elmtToTest) {
        if (!body[elmt]) return false;
    }
    return true;
};