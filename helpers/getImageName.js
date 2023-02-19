export default function getImageName(url) {
  const paths = url.split("/");
  const name = paths[paths.length - 1];
  return `/img/${name}`;
}
