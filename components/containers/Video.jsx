import { useState } from "react";
import { InView } from "react-intersection-observer";
import { Container, FullContainer } from "../common";

export default function Video({ embedUrl }) {
  const [showVideo, setShowVideo] = useState(false);

  return embedUrl ? (
    <InView className="w-full" onChange={(inView) => setShowVideo(inView)}>
      <FullContainer className="p-16 bg-white">
        <Container>
          {showVideo ? (
            <iframe
              className="w-full rounded-2xl h-96 lg:h-[600px]"
              src={embedUrl}
              title="Riverside Towing Service near me"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div>Loading...</div>
          )}
        </Container>
      </FullContainer>
    </InView>
  ) : (
    <></>
  );
}
