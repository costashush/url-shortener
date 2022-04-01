import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SERVER_ENDPOINTS } from "../config";

function URLShortenerForm() {
  const [destination, setDestination] = useState();
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
    destination: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    const result = await axios
      .post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
      })
      .then((resp) => resp.data);
    setShortUrl(result);
  }

  return (
    <Box pos="relative" zIndex="2" backgroundColor="white" padding="6">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e: any) => setDestination(e.target.value)}
            placeholder="https://example.com"
          />
          <button type="submit">CREATE</button>
        </form>
        {shortUrl && (
          <div>
            {window.location.origin + "/" + shortUrl?.shortId !== destination
              ? window.location.origin + "/" + shortUrl?.shortId
              : shortUrl?.destination}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/${shortUrl?.shortId}`}
            >
              browse
            </a>
          </div>
        )}
      </div>
    </Box>
  );
}

export default URLShortenerForm;
