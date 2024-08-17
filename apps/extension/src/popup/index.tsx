import * as ReactDOM from "react-dom/client";
import { t } from "@repo/i18n";
import { ExtensionVersion } from "@repo/types";
import { MessageListener, MessageSender } from "../message";

const messageSender = MessageSender("POPUP");

chrome.runtime
  .sendMessage(messageSender("ASK_VERSION", {}))
  .catch((e) => console.error(e));

chrome.runtime.onMessage.addListener((message) => {
  const backgroundListener = MessageListener(message, "BACKGROUND");
  backgroundListener.on("GET_VERSION", (data) => {
    const root = ReactDOM.createRoot(document.getElementById("root")!);
    root.render(<Root version={data as ExtensionVersion} />);
  });

  return false;
});

function Root({ version }: { version: ExtensionVersion }) {
  return (
    <div style={{ width: "300px" }}>
      <div>
        <p style={{ marginRight: "2em" }}>
          {t("Current version", { version: version.current })}
          {!version.isLatest && version.latestDownloadUrl ? (
            <a
              style={{ marginLeft: "1em" }}
              download
              href={version.latestDownloadUrl}
              target="_blank"
            >
              {t("Download latest version", { name: version.latest })}
            </a>
          ) : (
            <></>
          )}
        </p>
      </div>
      <div style={{ display: "flex", justifyItems: "center" }}>
        <a
          href={process.env.SITE_DOMAIN}
          target="_blank"
          style={{ display: "block" }}
        >
          {t("Title")}
        </a>
      </div>
    </div>
  );
}
