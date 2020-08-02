export default function create(elem, classNames, child, parent, ...dataAttr) {
  let element = null;
  try {
    element = document.createElement(elem);
  } catch (error) {
    throw new Error("Невозможно создать HTMLElement");
  }

  if (classNames) element.classList.add(...classNames.split(" "));

  if (child && Array.isArray(child)) {
    child.forEach(
      (childElement) => childElement && element.appendChild(childElement)
    );
  } else if (child && typeof child === "object") {
    element.appendChild(child);
  } else if (child && typeof child === "string") {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === "") {
        element.setAttribute(attrName, "");
      }
      if (
        attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)
      ) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    });
  }
  return element;
}
