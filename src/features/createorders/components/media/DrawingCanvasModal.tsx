import { useState, useRef, useEffect } from "react";
import Modal from "@/shared/components/Modal";
import { Stage, Layer, Line } from "react-konva";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface DrawLine {
  points: number[];
}

const DrawingCanvasModal = ({ isOpen, onClose }: Props) => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [stageSize, setStageSize] = useState({
    width: 0,
    height: 256,
  });

  // Make stage responsive
  useEffect(() => {
    if (!isOpen) return;

    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: 256,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [isOpen]);

  const handlePointerDown = () => {
    setIsDrawing(true);

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    setLines((prev) => [...prev, { points: [pos.x, pos.y] }]);
  };

  const handlePointerMove = () => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();

    if (!point) return;

    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      if (!lastLine) return prevLines;

      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };

      return [...prevLines.slice(0, -1), updatedLine];
    });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  // Save canvas as image
  const handleSaveImage = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const dataURL = stage.toDataURL({
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataURL;
    link.click();
  };

  // Clear canvas
  const handleClear = () => {
    setLines([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-md leading-tighter font-semibold mb-4">Drawing Canvas</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleSaveImage}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Save Image
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Clear
        </button>
      </div>

      <div ref={containerRef} className="border h-64">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={6}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </Modal>
  );
};

export default DrawingCanvasModal;