import React, { useState, useRef } from "react";
import "./Tables.css";

function Tables() {
  const [blocks, setBlocks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newWidth, setNewWidth] = useState(280);
  const [newHeight, setNewHeight] = useState(140);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const addBlock = () => {
    const nextId = blocks.length ? Math.max(...blocks.map((b) => b.id)) + 1 : 1;
    setBlocks([
      ...blocks,
      {
        id: nextId,
        title: newTitle || `Блок ${nextId}`,
        content: newContent || `Описание блока ${nextId}`,
        width: newWidth,
        height: newHeight,
        x: 20,
        y: 20,
      },
    ]);
    setNewTitle("");
    setNewContent("");
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleDragStart = (event, blockId) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;
    event.dataTransfer.setData("text/plain", blockId.toString());
    event.dataTransfer.effectAllowed = "move";
    const rect = event.currentTarget.getBoundingClientRect();
    setDraggedBlock(blockId);
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleDragOverBox = (event) => {
    event.preventDefault();
  };

  const handleDropOnBox = (event) => {
    event.preventDefault();
    const blockId = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isNaN(blockId) || !boxRef.current) return;

    const boxRect = boxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - boxRect.left - dragOffset.x, boxRect.width - newWidth));
    const y = Math.max(0, Math.min(event.clientY - boxRect.top - dragOffset.y, boxRect.height - newHeight));

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, x, y } : block
      )
    );
    setDraggedBlock(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
  };

  return (
    <div className="tables-page">
      <div className="tables-header">
        <h1>Управление блоками</h1>
      </div>

      <div className="block-form">
        <input
          type="text"
          placeholder="Название блока"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Описание блока"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <label>
          Ширина, px
          <input
            type="number"
            min="150"
            max="600"
            value={newWidth}
            onChange={(e) => setNewWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Высота, px
          <input
            type="number"
            min="100"
            max="400"
            value={newHeight}
            onChange={(e) => setNewHeight(Number(e.target.value))}
          />
        </label>
        <button className="btn btn-add" onClick={addBlock}>
          Создать блок
        </button>
      </div>

      {blocks.length === 0 ? (
        <p className="empty-message">Блоков пока нет. Создайте первый блок.</p>
      ) : (
        <div
          ref={boxRef}
          className="box"
          style={{ width: "100%", height: "700px", position: "relative" }}
          onDragOver={handleDragOverBox}
          onDrop={handleDropOnBox}
        >
          {blocks.map((block) => (
            <div
              key={block.id}
              className="block-card"
              draggable
              onDragStart={(event) => handleDragStart(event, block.id)}
              onDragEnd={handleDragEnd}
              style={{
                position: "absolute",
                left: `${block.x}px`,
                top: `${block.y}px`,
                width: `${block.width}px`,
                height: `${block.height}px`,
              }}
            >
              <div className="block-top">
                <div>
                  <h2>{block.title}</h2>
                  <p>{block.content}</p>
                </div>
                <div className="block-actions">
                  <button className="btn btn-delete" onClick={() => deleteBlock(block.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tables;
