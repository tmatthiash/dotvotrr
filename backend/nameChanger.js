const nameChanger = name => {
  let newName = name.replace(/er$/, "rr");
  newName = newName.replace(/er+[']+s$/, "rr's");
  newName = newName.replace(/ers$/, "rrs");
  return newName;
};

module.exports = { nameChanger };
