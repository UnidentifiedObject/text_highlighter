function highlightSelection() {
  const selection = window.getSelection();  //get the text user selected
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  const color = document.getElementById("colorPicker").value;

  // Create a span with inline background color
  const span = document.createElement("span");
  span.className = "custom-highlight";
  span.style.backgroundColor = color;

  try {
    range.surroundContents(span);
  } catch (err) {
    alert("Please select text within a single element (like one paragraph).");
  }

  selection.removeAllRanges(); //clear the selected text aftert its highlighted
}

function removeHighlight() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;

  // If user clicked exactly on a highlighted span
  const parent = container.nodeType === 3 ? container.parentElement : container;

  if (parent && parent.classList.contains("custom-highlight")) {
    const textNode = document.createTextNode(parent.textContent);
    parent.replaceWith(textNode);
  }
}
