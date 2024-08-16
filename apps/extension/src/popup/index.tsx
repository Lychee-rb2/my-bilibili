import * as ReactDOM from "react-dom/client";
import { t } from "@repo/i18n";

function Root() {
  return (
    <div style={{ display: "flex", justifyItems: "center", width: "200px" }}>
      <a
        href={process.env.SITE_DOMAIN}
        target="_blank"
        style={{ display: "block" }}
      >
        {t("Title")}
      </a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Root />);
