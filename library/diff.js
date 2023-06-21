const updateAttribute = (oldNode, newNode) => {
  if (oldNode.checked !== newNode.checked) oldNode.checked = newNode.checked;
  if (oldNode.value !== newNode.value) oldNode.value = newNode.value;
  if (oldNode.selected !== newNode.selected) oldNode.selected = newNode.selected;

  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) oldNode.setAttribute(name, value);
  }

  for (const { name } of [...oldNode.attributes]) {
    if (undefined === newNode.getAttribute(name)) oldNode.removeAttribute(name);
  }
};

const updateElement = (parent, oldNode, newNode) => {
  const oldNodes = [...(oldNode?.childNodes ?? [])];
  const newNodes = [...(newNode?.childNodes ?? [])];

  if (!oldNode && newNode) return parent.appendChild(newNode);

  if (oldNode && !newNode) return oldNode.remove();

  if (oldNode instanceof Text && newNode instanceof Text) {
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  if (oldNode.nodeName !== newNode.nodeName) return parent.replaceChild(newNode, oldNode);

  if (oldNode.nodeName === newNode.nodeName) {
    Array.from({ length: Math.max(oldNodes.length, newNodes.length) }, (_, idx) =>
      updateElement(oldNode, oldNodes[idx], newNodes[idx])
    );

    return updateAttribute(oldNode, newNode);
  }
};

export default updateElement;
