function getUrl(obj) {
  const ary = [];
  helper(obj, ary);
  return ary;
}

function helper(item, ary) {
  if (typeof item === "string" && isImage(item)) {
    ary.push(item);
    return;
  } else if (typeof item === "object") {
    for (const k in item) {
      helper(item[k], ary);
    }
    return;
  }
  return null;
}

function isImage(str) { 
  if (typeof str !== "string") return false;
  return /http|https/.test(str) && /[\/.](gif|jpg|jpeg|tiff|png|webp)$/i.test(str);
}

module.exports = getUrl;
