const formatPropertyName = (propertyName) => {
    const words = propertyName.split('_');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
};

export default formatPropertyName;