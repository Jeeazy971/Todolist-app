//jshint esversion:6

module.exports.getDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return today.toLocaleDateString('fr-FR', options);
};

module.exports.getDay = () => {
    const today = new Date();
    const options = { weekday: 'long' };

    return today.toLocaleDateString('fr-FR', options);
};
