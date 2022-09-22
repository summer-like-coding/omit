function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

// const benjy = { name: 'Benjy' ,friends:[{name:'summer',age:'15'},{name:'alex',age:12}]};
// const copy = omit(benjy, []);
// const copy1 = omit(benjy, ['friends'])
// console.log("copy", copy);
// console.log("copy1", copy1);
// console.log("benjy",benjy);

export default omit;
// export default omit;
