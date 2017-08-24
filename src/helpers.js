export const formatImageTags = labelData =>
  labelData[0].labelAnnotations.reduce((acc, tag) => {
    if (tag.score > .75) {
      acc.push(tag.description);
    }
    return acc;
  }, []);
