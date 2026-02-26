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
  const [stageSize, setStageSize] = useState({ width: 0, height: 256 });

  // Make stage responsive to container width
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Drawing Canvas</h2>

      <div ref={containerRef} className="border h-64">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handlePointerDown}
          onMousemove={handlePointerMove}
          onMouseup={handlePointerUp}
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
                tension={0.5}       // Smooth curve
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