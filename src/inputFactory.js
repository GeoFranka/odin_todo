export default function createInput(
  type,
  id,
  cssClass,
  placeholder,
  defaultVal,
) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("name", id);
  input.setAttribute("id", id);
  input.classList.add(cssClass);
  input.setAttribute("placeholder", placeholder);
  if (defaultVal) {
    input.value = defaultVal;
  }

  return input;
}
