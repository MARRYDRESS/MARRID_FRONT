"use client";

import Image from "next/image";
import styled from "styled-components";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import color from "@/src/style/color";
import font from "@/src/style/font";
import { useSavedDresses, SavedDress } from "@/src/store/savedDresses";

function SortableCard({ dress }: { dress: SavedDress }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: dress.id });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <Image
        src={dress.imageSrc}
        alt="저장된 드레스"
        fill
        sizes="(max-width: 1200px) 33vw, 339px"
        style={{ objectFit: "cover", objectPosition: "top" }}
        draggable={false}
      />
      <DragHint>⠿</DragHint>
    </Card>
  );
}

export default function SavedDressPage() {
  const { dresses, reorder } = useSavedDresses();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIndex = dresses.findIndex((d) => d.id === active.id);
    const newIndex = dresses.findIndex((d) => d.id === over.id);
    reorder(arrayMove(dresses, oldIndex, newIndex));
  }

  const activeDress = dresses.find((d) => d.id === activeId);

  return (
    <Wrap>
      <HeadingGroup>
        <Sub>내가 입었던 드레스,</Sub>
        <Title>본식에 입을 드레스를 고민해 보세요</Title>
      </HeadingGroup>

      {dresses.length === 0 ? (
        <Empty>
          저장된 드레스가 없어요.
          <br />
          피팅 페이지에서 저장하기를 눌러보세요.
        </Empty>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={dresses.map((d) => d.id)} strategy={rectSortingStrategy}>
            <Grid>
              {dresses.map((dress) => (
                <SortableCard key={dress.id} dress={dress} />
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay>
            {activeDress && (
              <OverlayCard>
                <Image
                  src={activeDress.imageSrc}
                  alt="드래그 중"
                  fill
                  sizes="339px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  draggable={false}
                />
              </OverlayCard>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingGroup = styled.div`
  margin-bottom: 48px;
`;

const Sub = styled.p`
  margin: 0 0 4px;
  ${font["title-sm"]};
  color: ${color.black};
`;

const Title = styled.h1`
  margin: 0;
  ${font["title-md"]};
  color: ${color.black};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 339 / 510;
  background: ${color.gray100};
  overflow: hidden;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const DragHint = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const OverlayCard = styled.div`
  position: relative;
  width: 339px;
  aspect-ratio: 339 / 510;
  background: ${color.gray100};
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
  cursor: grabbing;
`;

const Empty = styled.p`
  margin: 80px auto;
  text-align: center;
  ${font["text-sm"]};
  color: ${color.gray500};
  line-height: 1.8;
`;
